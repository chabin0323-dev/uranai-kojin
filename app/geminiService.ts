import { GoogleGenerativeAI } from "@google/generative-ai";

// Google AI Studioのコードと同じ「API_KEY」を使います
const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");

export async function getFortune(name: string, dob: string, bloodType: string) {
  // モデル名はあなたが確認した「gemini-3-flash-preview」
  const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

  const prompt = `${name}さんの今日の運勢を占って、{"score": 80, "advice": "進め"}のJSON形式で返して。`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // JSON部分だけを抽出
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}') + 1;
    return JSON.parse(text.substring(start, end));
  } catch (error) {
    // どんなエラーが出ているか、コンソールで確認できるようにします
    console.error("Communication Error:", error);
    throw error;
  }
}
