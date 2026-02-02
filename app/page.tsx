"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// --- 設定と定数 ---
const MAX_USAGE = 5;
const STORAGE_KEY_FORTUNE = 'persisted_fortune_result';
const YEARS = Array.from({ length: 100 }, (_, i) => `${2026 - i}年`);
const MONTHS = Array.from({ length: 12 }, (_, i) => `${i + 1}月`);
const DAYS = Array.from({ length: 31 }, (_, i) => `${i + 1}日`);
const BLOOD_TYPES = ['A型', 'B型', 'O型', 'AB型'];
const ZODIAC_SIGNS = ['牡羊座', '牡牛座', '双子座', '蟹座', '獅子座', '乙女座', '天秤座', '蠍座', '射手座', '山羊座', '水瓶座', '魚座'];
const ETO = ['子（ね）', '丑（うし）', '寅（とら）', '卯（う）', '辰（たつ）', '巳（み）', '午（うま）', '未（ひつじ）', '申（さる）', '酉（とり）', '戌（いぬ）', '亥（い）'];

// --- メインコンポーネント ---
export default function App() {
  const [userInfo, setUserInfo] = useState({ name: 'あなた', year: '1996年', month: '1月', day: '1日', bloodType: 'A型', zodiacSign: '牡羊座', eto: '子（ね）' });
  const [usageCount, setUsageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [fortune, setFortune] = useState<any>(null);

  // 利用回数の読み込み [cite: 2026-01-03]
  useEffect(() => {
    const today = new Date().toLocaleDateString();
    const storedUsage = localStorage.getItem('fortune_usage');
    if (storedUsage) {
      const { date, count } = JSON.parse(storedUsage);
      if (date === today) setUsageCount(count);
    }
  }, []);

  // 占いの実行
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (usageCount >= MAX_USAGE) return;

    setIsLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash", // 【無料枠固定】 [cite: 2026-01-03]
        systemInstruction: "精密AI鑑定師として、JSON形式で運勢を返してください。"
      });

      const prompt = `${userInfo.year}生まれ、${userInfo.bloodType}の運勢を鑑定してください。`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setFortune(JSON.parse(response.text().replace(/```json|```/g, '')));
      
      const newCount = usageCount + 1;
      setUsageCount(newCount);
      localStorage.setItem('fortune_usage', JSON.stringify({ date: new Date().toLocaleDateString(), count: newCount }));
    } catch (err) {
      alert("鑑定に失敗しました。APIキーを確認してください。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">AI Fortune Teller</h1>
      
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 bg-white/5 p-6 rounded-xl border border-white/10">
        <p className="text-cyan-400 text-center text-sm">本日の残り回数：{MAX_USAGE - usageCount}回</p>
        
        {/* PCでの白紙防止セレクトボックス */}
        <div>
          <label className="block text-xs mb-1">干支</label>
          <select 
            value={userInfo.eto} 
            onChange={(e) => setUserInfo({...userInfo, eto: e.target.value})}
            style={{ backgroundColor: '#ffffff', color: '#000000' }}
            className="w-full p-2 rounded text-black"
          >
            {ETO.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>

        <button 
          disabled={isLoading || usageCount >= MAX_USAGE}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-bold"
        >
          {isLoading ? "鑑定中..." : (usageCount >= MAX_USAGE ? "上限に達しました" : "運勢を占う")}
        </button>
      </form>
      
      {fortune && (
        <div className="mt-8 p-6 bg-white/10 rounded-xl w-full max-w-md animate-pulse">
          <h2 className="text-xl font-bold text-center mb-4">鑑定結果</h2>
          <p className="leading-relaxed">{fortune.overall?.text || "運勢を読み解きました。"}</p>
        </div>
      )}
    </div>
  );
}
