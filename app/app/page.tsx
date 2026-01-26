"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Info, Loader2, Save, Lock, Unlock } from 'lucide-react';

// --- [types.ts] の内容を統合 ---
interface FortuneCategory { luck: number; text: string; }
interface Fortune {
  overall: FortuneCategory; money: FortuneCategory; health: FortuneCategory;
  love: FortuneCategory; work: FortuneCategory; luckyItem: string; luckyNumber: string;
}
interface UserInfo {
  name: string; year: string; month: string; day: string;
  bloodType: string; zodiacSign: string; eto: string;
}

// --- [constants.ts] の内容を統合 ---
const BLOOD_TYPES = ["A", "B", "O", "AB"];
const ZODIAC_SIGNS = ["牡羊座", "牡牛座", "双子座", "蟹座", "獅子座", "乙女座", "天秤座", "蠍座", "射手座", "山羊座", "水瓶座", "魚座"];
const ETO = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

// --- [メインアプリ] ---
export default function App() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: 'あなた', year: '1990', month: '1', day: '1',
    bloodType: BLOOD_TYPES[0], zodiacSign: ZODIAC_SIGNS[0], eto: ETO[0]
  });
  const [usageCount, setUsageCount] = useState(0);
  const [result, setResult] = useState<Fortune | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | null>('saved');
  const MAX_USAGE = 5;

  // 利用回数の管理ロジック
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
    
    // 擬似的な占い生成（AI Studioのロジックを再現）
    setTimeout(() => {
      const mockFortune: Fortune = {
        overall: { luck: 5, text: "最高の一日です！" },
        money: { luck: 4, text: "思わぬ収入があるかも。" },
        health: { luck: 5, text: "活力に満ちあふれています。" },
        love: { luck: 3, text: "誠実な対応が吉。" },
        work: { luck: 4, text: "努力が認められます。" },
        luckyItem: "青いペン", luckyNumber: "7"
      };
      setResult(mockFortune);
      const newCount = usageCount + 1;
      setUsageCount(newCount);
      localStorage.setItem('fortune_usage', JSON.stringify({ date: new Date().toLocaleDateString(), count: newCount }));
      setIsLoading(false);
      setAutoSaveStatus('saved');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col items-center font-sans">
      {/* 自動保存インジケーター */}
      <div className="fixed bottom-6 right-6 flex items-center space-x-2 bg-slate-900/90 p-3 rounded-full border border-white/10">
        <div className={`w-2 h-2 rounded-full ${autoSaveStatus === 'saved' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
        <span className="text-[10px] font-bold text-gray-300">
          {autoSaveStatus === 'saved' ? '自動保存済み' : '保存中...'}
        </span>
      </div>

      <header className="w-full max-w-2xl mt-8 mb-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
          AI Fortune Teller
        </h1>
      </header>

      <main className="w-full max-w-2xl bg-white/5 p-6 rounded-2xl border border-white/10">
        <div className="space-y-6">
          <div className="flex justify-between items-center text-sm">
            <span className="text-cyan-400 font-bold">残り回数: {MAX_USAGE - usageCount} / {MAX_USAGE}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input 
              className="bg-gray-800 p-2 rounded" 
              value={userInfo.name}
              onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
            />
            <select className="bg-gray-800 p-2 rounded">
              {BLOOD_TYPES.map(t => <option key={t}>{t}型</option>)}
            </select>
          </div>

          <Button 
            onClick={handleFortune}
            disabled={isLoading || usageCount >= MAX_USAGE}
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 py-6 text-xl font-bold rounded-xl"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "運勢を占う"}
          </Button>

          {result && (
            <div className="mt-8 p-6 bg-white/10 rounded-xl border-l-4 border-purple-500 animate-in fade-in">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">鑑定結果</h2>
              <p className="text-lg leading-relaxed">{result.overall.text}</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-400">
                <p>ラッキーアイテム: {result.luckyItem}</p>
                <p>ラッキーナンバー: {result.luckyNumber}</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
