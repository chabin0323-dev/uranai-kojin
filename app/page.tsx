"use client";

import React, { useState, useEffect } from 'react';
import { Info, Loader2 } from 'lucide-react';

// 全てのデータと型を1枚に集約（ズレをゼロにする）
const BLOOD_TYPES = ["A", "B", "O", "AB"];
const ZODIAC_SIGNS = ["牡羊座", "牡牛座", "双子座", "蟹座", "獅子座", "乙女座", "天秤座", "蠍座", "射手座", "山羊座", "水瓶座", "魚座"];

export default function App() {
  const [usageCount, setUsageCount] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const MAX_USAGE = 5;

  const handleFortune = () => {
    if (usageCount >= MAX_USAGE) return;
    setIsLoading(true);
    setTimeout(() => {
      setResult("今日のアドバイス：一歩踏み出す勇気が、素晴らしい未来を引き寄せます。");
      setUsageCount(prev => prev + 1);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center font-sans">
      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 mt-10 mb-8">
        AI Fortune Teller
      </h1>
      
      <div className="w-full max-w-md bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl space-y-6">
        <div className="flex justify-between items-center text-xs font-bold text-cyan-400">
          <span>本日の残り：{MAX_USAGE - usageCount} / {MAX_USAGE}回</span>
        </div>

        <div className="space-y-4 text-sm">
          <label className="text-gray-400 block text-center">占いたい方の情報を入力</label>
          <input className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700" placeholder="お名前" />
          <div className="grid grid-cols-2 gap-2">
            <select className="bg-gray-800 p-3 rounded-lg border border-gray-700 text-gray-300">
              {BLOOD_TYPES.map(t => <option key={t}>{t}型</option>)}
            </select>
            <select className="bg-gray-800 p-3 rounded-lg border border-gray-700 text-gray-300">
              {ZODIAC_SIGNS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <button 
          onClick={handleFortune}
          disabled={isLoading || usageCount >= MAX_USAGE}
          className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-30"
        >
          {isLoading ? <Loader2 className="mx-auto animate-spin" /> : "今すぐ占う"}
        </button>

        {result && (
          <div className="mt-6 p-6 bg-purple-900/20 border-l-4 border-pink-500 rounded-lg animate-in fade-in slide-in-from-top-4">
            <p className="text-center leading-relaxed text-purple-100">{result}</p>
          </div>
        )}
      </div>

      <div className="fixed bottom-6 right-6 flex items-center gap-2 bg-slate-900/80 p-3 rounded-full border border-white/10 text-[10px] text-gray-400">
        <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
        自動保存済み
      </div>
    </div>
  );
}
