import { GoogleGenerativeAI } from "@google/generative-ai";

export async function getFortune(name: string, dob: string, bloodType: string) {
  // ここで Vercel の API_KEY を確実に呼び出します
  const key = process.env.NEXT_PUBLIC_API_KEY || process.env.API_KEY;
  const genAI = new GoogleGenerativeAI(key || "");
  
  const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

  const prompt = `${name}さんの運勢を占って、JSON形式 {"score": 80, "advice": "メッセージ"} で返してください。`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}') + 1;
    return JSON.parse(text.substring(start, end));
  } catch (error) {
    // エラーの内容を具体的に画面に投げるようにします
    throw new Error("Gemini通信失敗: " + (error instanceof Error ? error.message : "不明なエラー"));
  }
}
