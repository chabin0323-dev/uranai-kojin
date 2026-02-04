import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, dob, bloodType } = await req.json();
  
  // Vercelのサーバー側にあるAPI_KEYを安全に読み込みます
  const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");
  const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

  const prompt = `${name}さんの今日の運勢を教えて。{"score": 80, "advice": "進め"}のJSONだけで返して。`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}') + 1;
    const data = JSON.parse(text.substring(start, end));
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "API通信に失敗しました" }, { status: 500 });
  }
}
