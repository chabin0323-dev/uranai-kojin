import { GoogleGenerativeAI } from "@google/generative-ai";

export async function getFortune(name: string, dob: string, bloodType: string): Promise<any> {
  // Vercelの設定からAPIキーを読み込みます
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
  
  // 前回成功したモデル名
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `${name}さん（生年月日:${dob}、血液型:${bloodType}）の今日の運勢を占ってください。結果は必ず {"score": 数値, "summary": "一言", "advice": "詳細"} のJSON形式で返してください。`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // JSON部分だけを抽出して解析します
    const jsonMatch = text.match(/\{.*\}/s);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error("解析エラー");
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}
