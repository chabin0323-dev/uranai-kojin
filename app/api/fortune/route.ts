import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, year, month, day, bloodType, sign, zodiac } = await req.json();
    const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `
    占い師として、以下の情報を元に詳細に鑑定してください。
    【情報】氏名:${name}, 生年月日:${year}/${month}/${day}, 血液型:${bloodType}, 星座:${sign}, 干支:${zodiac}

    必ず以下のJSON形式で返してください。
    {
      "overall": {"luck": 85, "text": "全体運の解説"},
      "money": {"luck": 4, "text": "金運解説"},
      "health": {"luck": 5, "text": "健康運解説"},
      "love": {"luck": 3, "text": "恋愛運解説"},
      "work": {"luck": 4, "text": "仕事運解説"},
      "luckyItem": "アイテム名",
      "luckyNumber": "数字"
    }`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}") + 1;
    return NextResponse.json(JSON.parse(text.substring(jsonStart, jsonEnd)));
  } catch (error) {
    return NextResponse.json({ error: "鑑定エラー" }, { status: 500 });
  }
}
