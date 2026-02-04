import { GoogleGenerativeAI } from "@google/generative-ai";

export async function getFortune(name: string, dob: string, bloodType: string) {
  // 1. キーの読み込み（Vercelの設定と一致している必要があります）
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
  
  // 2. モデルの指定（現在最も安定しているモデルです）
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // 3. 以前成功した時のような、最もシンプルなプロンプト
  const prompt = `${name}さんの今日の運勢を占って、結果を教えてください。`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // 以前のように、JSON解析をせずにそのままテキストを返す設定にします
    return { score: "??", advice: text };
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
