"use client";

import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

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
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center font-sans">
      {/* ↓ ここがグラデーションの心臓部です */}
      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 mt-10 mb-8 py-2">
        AI Fortune Teller
      </h1>
      
      <div className="w-full max-w-md bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl space-y-6">
        <div className="flex justify-between items-center text-xs font-bold text-cyan-400">
          <span>本日の残り回数：{MAX_USAGE - usageCount} / {MAX_USAGE}</span>
        </div>

        <div className="space-y-4">
          <input className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700 text-white placeholder-gray-500" placeholder="お名前" />
          <div className="grid grid-cols-2 gap-2">
            <select className="bg-gray-800 p-3 rounded-lg border border-gray-700 text-gray-300">
              <option>A型</option><option>B型</option><option>O型</option><option>AB型</option>
            </select>
            <select className="bg-gray-800 p-3 rounded-lg border border-gray-700 text-gray-300">
              <option>牡羊座</option><option>牡牛座</option><option>双子座</option><option>蟹座</option>
            </select>
          </div>
        </div>

        <button 
          onClick={handleFortune}
          disabled={isLoading || usageCount >= MAX_USAGE}
          className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 py-4 rounded-xl font-bold text-lg hover:opacity-90 disabled:opacity-30 transition-all shadow-lg shadow-purple-500/20"
        >
          {isLoading ? <Loader2 className="mx-auto animate-spin" /> : "鑑定を開始する"}
        </button>

        {result && (
          <div className="mt-6 p-6 bg-purple-900/20 border-l-4 border-cyan-500 rounded-lg animate-in fade-in slide-in-from-top-4">
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
