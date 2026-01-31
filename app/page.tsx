"use client";

import { useState } from "react";
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
      // あなたの有料版APIキーを直接書き込んでいます
      const apiKey = "AIzaSyCdoBchk09c15fwd4Q5gJMgETQZdOCHN20";
      
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `${name}さんは血液型が${bloodType}、星座が${zodiac}です。今日の運勢を100文字程度で、具体的かつ前向きに占ってください。`;
      const result = await model.generateContent(prompt);
      setResult(result.response.text());
    } catch (error) {
      setResult("通信に失敗しました。Logsを確認してください。");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-md mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Gemini AI 占い師
        </h1>

        <div className="space-y-4 bg-gray-900 p-6 rounded-xl border border-gray-800">
          <div>
            <label className="block text-sm font-medium mb-1">お名前</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded p-2 focus:ring-2 focus:ring-purple-500"
              placeholder="例：タナカ"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">血液型</label>
              <select
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                className="w-full bg-black border border-gray-700 rounded p-2"
              >
                {bloodTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">星座</label>
              <select
                value={zodiac}
                onChange={(e) => setZodiac(e.target.value)}
                className="w-full bg-black border border-gray-700 rounded p-2"
              >
                {zodiacSigns.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={tellFortune}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? "鑑定中..." : "鑑定を開始する"}
          </button>
        </div>

        {result && (
          <div className="bg-gray-900 p-6 rounded-xl border border-purple-500/50 animate-fade-in">
            <h2 className="text-xl font-bold mb-3 text-purple-400">鑑定結果</h2>
            <p className="leading-relaxed text-gray-200">{result}</p>
          </div>
        )}
      </div>
    </main>
  );
}
