import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, dob, bloodType } = await req.json();
    const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    // AI Studioの設定をここに集約
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `${name}さん(${dob}型)の今日の運勢を占ってください。` }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            overall: { type: "object", properties: { luck: { type: "integer" }, text: { type: "string" } } },
            luckyItem: { type: "string" },
            luckyNumber: { type: "string" }
          },
          required: ["overall", "luckyItem", "luckyNumber"]
        }
      }
    });

    const response = await result.response;
    return NextResponse.json(JSON.parse(response.text()));
  } catch (error) {
    return NextResponse.json({ error: "API Error" }, { status: 500 });
  }
}
