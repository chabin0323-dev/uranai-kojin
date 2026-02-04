import { GoogleGenerativeAI } from "@google/generative-ai";

export async function getFortune(name: string, dob: string, bloodType: string) {
  // Vercelに新しく設定した「API_KEY」を読み込むように変更します
  const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");
  
  // あなたが画像で確認した最新モデル名
  const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

  const prompt = `${name}さんの今日の運勢を教えて。結果は必ず {"score": 80, "advice": "今日は良い日です"} の形式で返して。`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return JSON.parse(text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1));
}
