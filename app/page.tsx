"use client";

import React, { useState, useEffect } from 'react';
import { Loader2, Sparkles } from 'lucide-react';

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
      {/* 🔮 グラデーションの心臓部：ここが紫から水色に輝きます */}
      <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 mt-16 mb-10 py-2 tracking-tighter drop-shadow-sm">
        AI Fortune Teller
      </h1>
      
      <div className="w-full max-w-md bg-white/5 p-8 rounded-3xl border border-white/10 shadow-[0_0_50px_-12px_rgba(168,85,247,0.2)] space-y-8 backdrop-blur-sm">
        <div className="flex justify-between items-center px-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400/80">Usage Status</span>
          <span className="text-xs font-bold text-white/90 bg-white/10 px-3 py-1 rounded-full border border-white/5">
            残り {MAX_USAGE - usageCount} / {MAX_USAGE} 回
          </span>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] ml-1 text-gray-500 font-bold uppercase tracking-tighter">Your Name</label>
            <input className="w-full bg-gray-900/50 p-4 rounded-xl border border-white/5 focus:border-purple-500/50 outline-none transition-all text-white placeholder-gray-700" placeholder="お名前を入力してください" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] ml-1 text-gray-500 font-bold uppercase tracking-tighter">Blood Type</label>
              <select className="w-full bg-gray-900/50 p-4 rounded-xl border border-white/5 text-gray-300 outline-none appearance-none">
                <option>A型</option><option>B型</option><option>O型</option><option>AB型</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] ml-1 text-gray-500 font-bold uppercase tracking-tighter">Zodiac</label>
              <select className="w-full bg-gray-900/50 p-4 rounded-xl border border-white/5 text-gray-300 outline-none appearance-none">
                <option>牡羊座</option><option>牡牛座</option><option>双子座</option><option>蟹座</option>
                <option>獅子座</option><option>乙女座</option><option>天秤座</option><option>蠍座</option>
              </select>
            </div>
          </div>
        </div>

        <button 
          onClick={handleFortune}
          disabled={isLoading || usageCount >= MAX_USAGE}
          className="w-full bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 py-5 rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-purple-500/20 disabled:opacity-20 disabled:grayscale"
        >
          {isLoading ? <Loader2 className="mx-auto animate-spin" /> : (
            <div className="flex items-center justify-center gap-2">
              <Sparkles size={20} />
              <span>鑑定を開始する</span>
            </div>
          )}
        </button>

        {result && (
          <div className="mt-8 p-8 bg-gradient-to-br from-purple-900/30 to-black border border-purple-500/30 rounded-2xl animate-in fade-in zoom-in-95 duration-500">
            <p className="text-center text-lg leading-relaxed text-purple-100 font-medium">{result}</p>
          </div>
        )}
      </div>

      <div className="mt-12 flex items-center gap-3 bg-white/5 px-5 py-2.5 rounded-full border border-white/5 text-[10px] text-gray-500 font-bold tracking-widest uppercase">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
        Cloud Auto Sync Enabled
      </div>
    </div>
  );
}
