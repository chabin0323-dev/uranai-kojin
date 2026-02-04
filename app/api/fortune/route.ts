import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, dob, bloodType } = await req.json();
  
  const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");
  const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

  // AI Studioの指示を反映
  const prompt = `
  ${name}さん（生年月日:${dob}、血液型:${bloodType}型）の今日の運勢を占ってください。
  【重要】評価(luck)は1〜5で分散させ、解説(text)は40文字以内で簡潔に出力してください。
  `;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        // 画像のSchemaを完全に再現
        responseSchema: {
          type: "object",
          properties: {
            overall: { type: "object", properties: { luck: { type: "integer" }, text: { type: "string" } } },
            money: { type: "object", properties: { luck: { type: "integer" }, text: { type: "string" } } },
            health: { type: "object", properties: { luck: { type: "integer" }, text: { type: "string" } } },
            love: { type: "object", properties: { luck: { type: "integer" }, text: { type: "string" } } },
            work: { type: "object", properties: { luck: { type: "integer" }, text: { type: "string" } } },
            luckyItem: { type: "string" },
            luckyNumber: { type: "string" }
          },
          required: ["overall", "money", "health", "love", "work", "luckyItem", "luckyNumber"]
        }
      }
    });

    const response = await result.response;
    return NextResponse.json(JSON.parse(response.text()));
  } catch (error) {
    return NextResponse.json({ error: "API通信に失敗しました" }, { status: 500 });
  }
}
