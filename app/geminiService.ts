import { GoogleGenerativeAI } from "@google/generative-ai";

export async function getFortune(name: string, dob: string, bloodType: string): Promise<any> {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
  // 前回成功したモデル名を指定
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `${name}さん（生年月日:${dob}、血液型:${bloodType}）の運勢を占ってください。結果は必ず {"score": 80, "summary": "良い一日", "advice": "ラッキーアイテムはペンです"} というJSON形式で返してください。`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return JSON.parse(response.text().match(/\{.*\}/s)![0]);
}
