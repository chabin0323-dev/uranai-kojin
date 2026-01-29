"use client";

import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Home() {
  const [name, setName] = useState("");
  const [bloodType, setBloodType] = useState("A型");
  const [zodiac, setZodiac] = useState("牡羊座");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const bloodTypes = ["A型", "B型", "O型", "AB型"];
  const zodiacSigns = [
    "牡羊座", "牡牛座", "双子座", "蟹座", "獅子座", "乙女座",
    "天秤座", "蠍座", "射手座", "山羊座", "水瓶座", "魚座"
  ];

  const tellFortune = async () => {
    if (!name) {
      alert("お名前を入力してください");
      return;
    }
    setLoading(true);
    try {
      // VercelのEnvironment Variablesに設定したAPIキーを読み込みます
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY;
      if (!apiKey) throw new Error("APIキーが設定されていません");

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `${name}さんは血液型が${bloodType}、星座が${zodiac}です。今日の運勢を100文字程度で、具体的かつ前向きに占ってください。`;
      const result = await model.generateContent(prompt);
      setResult(result.response.text());
    } catch (error) {
      setResult("占いに失敗しました。VercelのAPIキー設定（Environment Variables）を確認してください。");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white p-8 font-sans flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-purple-400">Gemini AI 占い師</h1>
      
      <div className="bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-md border border-purple-500">
        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-400">お名前</label>
          <input 
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white focus:border-purple-500 outline-none"
            type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="例：タナカ"
          />
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm mb-1 text-gray-400">血液型</label>
            <select 
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
              value={bloodType} onChange={(e) => setBloodType(e.target.value)}
            >
              {bloodTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm mb-1 text-gray-400">星座</label>
            <select 
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
              value={zodiac} onChange={(e) => setZodiac(e.target.value)}
            >
              {zodiacSigns.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <button 
          onClick={tellFortune}
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded-lg font-bold transition-all disabled:bg-gray-600 active:scale-95"
        >
          {loading ? "宇宙と交信中..." : "鑑定を開始する"}
        </button>

        {result && (
          <div className="mt-6 p-4 bg-gray-800 rounded border-l-4 border-purple-500 text-sm leading-relaxed animate-pulse">
            <p className="text-gray-200">{result}</p>
          </div>
        )}
      </div>
    </main>
  );
}
// cache clear test
