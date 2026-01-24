import { GoogleGenAI, Type } from "@google/genai";
import { Fortune, UserInfo } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFortune = async (userInfo: UserInfo, targetDate: string): Promise<Fortune> => {
  const response = await ai.models.generateContent({
    // ↓ ここを最新の正しいモデル名に修正しました
    model: "gemini-1.5-flash", 
    contents: `${targetDate}の運勢を占ってください。
【重要】評価(luck)は1〜5で分散させ、解説(text)は40文字以内で簡潔に出力してください。
入力情報：${JSON.stringify(userInfo)}`,
    config: {
      responseMimeType: "application/json",
      seed: 42,
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          overall: { type: Type.OBJECT, properties: { luck: { type: Type.INTEGER }, text: { type: Type.STRING } }, required: ["luck", "text"] },
          money: { type: Type.OBJECT, properties: { luck: { type: Type.INTEGER }, text: { type: Type.STRING } }, required: ["luck", "text"] },
          health: { type: Type.OBJECT, properties: { luck: { type: Type.INTEGER }, text: { type: Type.STRING } }, required: ["luck", "text"] },
          love: { type: Type.OBJECT, properties: { luck: { type: Type.INTEGER }, text: { type: Type.STRING } }, required: ["luck", "text"] },
          work: { type: Type.OBJECT, properties: { luck: { type: Type.INTEGER }, text: { type: Type.STRING } }, required: ["luck", "text"] },
          luckyItem: { type: Type.STRING },
          luckyNumber: { type: Type.STRING }
        },
        required: ["overall", "money", "health", "love", "work", "luckyItem", "luckyNumber"]
      }
    },
  });
  return JSON.parse(response.text) as Fortune;
};
