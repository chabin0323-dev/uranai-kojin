import { GoogleGenAI, SchemaType } from "@google/generative-ai";
import { Fortune, UserInfo } from '../types';

const genAI = new GoogleGenAI(process.env.API_KEY || "");
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const getFortune = async (userInfo: UserInfo, targetDate: string): Promise<Fortune> => {
  const prompt = `${targetDate}の運勢を占ってください。
入力情報：${JSON.stringify(userInfo)}
【重要】評価(luck)は1〜5で分散させ、解説(text)は40文字以内で簡潔に出力してください。`;

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          overall: { type: SchemaType.OBJECT, properties: { luck: { type: SchemaType.NUMBER }, text: { type: SchemaType.STRING } }, required: ["luck", "text"] },
          money: { type: SchemaType.OBJECT, properties: { luck: { type: SchemaType.NUMBER }, text: { type: SchemaType.STRING } }, required: ["luck", "text"] },
          health: { type: SchemaType.OBJECT, properties: { luck: { type: SchemaType.NUMBER }, text: { type: SchemaType.STRING } }, required: ["luck", "text"] },
          love: { type: SchemaType.OBJECT, properties: { luck: { type: SchemaType.NUMBER }, text: { type: SchemaType.STRING } }, required: ["luck", "text"] },
          work: { type: SchemaType.OBJECT, properties: { luck: { type: SchemaType.NUMBER }, text: { type: SchemaType.STRING } }, required: ["luck", "text"] },
          luckyItem: { type: SchemaType.STRING },
          luckyNumber: { type: SchemaType.STRING }
        },
        required: ["overall", "money", "health", "love", "work", "luckyItem", "luckyNumber"]
      }
    }
  });

  return JSON.parse(result.response.text()) as Fortune;
};
