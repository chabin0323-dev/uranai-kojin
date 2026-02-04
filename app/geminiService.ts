import { GoogleGenerativeAI } from "@google/generative-ai";

export async function getFortune(name: string, dob: string, bloodType: string): Promise<any> {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `${name}さん（生年月日:${dob}、血液型:${bloodType}）の今日の運勢を占ってください。結果は必ず {"score": 80, "summary": "良い一日", "advice": "自信を持って進みましょう"} という形式のJSONデータのみで返してください。`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // エラーの原因だった特殊な書き方を避け、シンプルな解析に変更
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}') + 1;
    return JSON.parse(text.substring(start, end));
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
