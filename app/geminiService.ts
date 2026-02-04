import { GoogleGenerativeAI } from "@google/generative-ai";

export async function getFortune(name: string, dob: string, bloodType: string) {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `${name}さん、生年月日${dob}、血液型${bloodType}の運勢を占って、{"score": 数値, "summary": "一言", "advice": "詳細"}のJSON形式で返して。`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return JSON.parse(response.text().replace(/```json|```/g, ""));
}
