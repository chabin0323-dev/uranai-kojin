"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Info, Loader2, Save, Lock, Unlock } from 'lucide-react';

// --- すべての部品をここに集結（1ミリのズレも許さない） ---
const BLOOD_TYPES = ["A", "B", "O", "AB"];
const ZODIAC_SIGNS = ["牡羊座", "牡牛座", "双子座", "蟹座", "獅子座", "乙女座", "天秤座", "蠍座", "射手座", "山羊座", "水瓶座", "魚座"];

export default function App() {
  const [usageCount, setUsageCount] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | null>('saved');
  const MAX_USAGE = 5;

  // 利用回数管理 (21:37:32のロジックを再現)
  useEffect(() => {
    const today = new Date().toLocaleDateString();
    const stored = localStorage.getItem('fortune_usage');
    if (stored) {
      const { date, count } = JSON.parse(stored);
      if (date === today) setUsageCount(count);
    }
  }, []);

  const handleFortune = async () => {
    if (usageCount >= MAX_USAGE) return;
    setIsLoading(true);
    setAutoSaveStatus('saving');
    
    // AI Studio の動きを再現
    setTimeout(() => {
      setResult({ overall: { text: "最高の一日になります！" }, luckyItem: "青いペン" });
      const newCount = usageCount + 1;
      setUsageCount(newCount);
      localStorage.setItem('fortune_usage', JSON.stringify({ date: new Date().toLocaleDateString(), count: newCount }));
      setIsLoading(false);
      setAutoSaveStatus('saved');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center font-sans">
      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 mt-10 mb-8">
        AI Fortune Teller
      </h1>
      
      <div className="w-full max-w-md bg-white/5 p-8 rounded-2xl border border-white/10 space-y-6">
        <div className="flex justify-between items-center text-xs text-cyan-400 font-bold">
          <span>本日の残り回数：{MAX_USAGE - usageCount} / {MAX_USAGE}</span>
        </div>

        <div className="space-y-4">
          <input className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700" placeholder="お名前" />
          <div className="grid grid-cols-2 gap-2">
            <select className="bg-gray-800 p-3 rounded-lg border border-gray-700">
              {BLOOD_TYPES.map(t => <option key={t}>{t}型</option>)}
            </select>
            <select className="bg-gray-800 p-3 rounded-lg border border-gray-700">
              {ZODIAC_SIGNS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <button 
          onClick={handleFortune}
          disabled={isLoading || usageCount >= MAX_USAGE}
          className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 py-4 rounded-xl font-bold text-lg hover:opacity-90 disabled:opacity-30"
        >
          {isLoading ? <Loader2 className="mx-auto animate-spin" /> : "鑑定を開始する"}
        </button>

        {result && (
          <div className="mt-6 p-6 bg-purple-900/20 border-l-4 border-pink-500 rounded-lg">
            <p className="text-center">{result.overall.text}</p>
          </div>
        )}
      </div>

      {/* 自動保存ステータス (21:38:30の見た目を再現) */}
      <div className="fixed bottom-6 right-6 flex items-center gap-2 bg-slate-900/90 p-3 rounded-full border border-white/10 text-[10px] text-gray-300">
        <div className={`w-2 h-2 rounded-full ${autoSaveStatus === 'saved' ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-amber-400 animate-pulse'}`} />
        {autoSaveStatus === 'saved' ? '自動保存済み' : '保存中...'}
      </div>
    </div>
  );
}
