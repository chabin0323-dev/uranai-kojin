import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, dob, bloodType } = await req.json();
    const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    // 命令文（プロンプト）の中で、出力形式を徹底的に指定します
    const prompt = `
    あなたはプロの占い師です。以下の情報を元に今日の運勢を占ってください。
    占う人：${name}さん (生年月日: ${dob}、血液型: ${bloodType}型)

    必ず以下のJSON形式でのみ返答してください。余計な説明は一切不要です。
    {
      "overall": { "luck": 80, "text": "ここに鑑定文を40文字以内で記述" },
      "luckyItem": "ラッキーアイテム名",
      "luckyNumber": "7"
    }
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // JSON部分だけを抽出する安全な処理
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}") + 1;
    const jsonContent = JSON.parse(text.substring(jsonStart, jsonEnd));

    return NextResponse.json(jsonContent);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "鑑定エラー" }, { status: 500 });
  }
}
