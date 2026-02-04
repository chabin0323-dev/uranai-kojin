import { GoogleGenerativeAI } from "@google/generative-ai";

export async function getFortune(name: string, dob: string, bloodType: string) {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
  
  // スクリーンショットに基づいて、最新の「Gemini 3 Flash」を指定します
  const model = genAI.getGenerativeModel({ model: "gemini-3-flash" });

  const prompt = `${name}さん、生年月日${dob}、血液型${bloodType}の今日の運勢を占って。{"score": 80, "summary": "良い", "advice": "進め"}のJSONで返して。`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return JSON.parse(text.match(/\{.*\}/s)![0]);
  } catch (error) {
    console.error("Gemini 3 Error:", error);
    throw error;
  }
}
