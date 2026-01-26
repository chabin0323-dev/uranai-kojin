"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Info, Loader2, Save, Lock, Unlock } from 'lucide-react';

// --- すべての部品（types, constants, components）をここに集結 ---

// 1. 型定義 (types)
interface Fortune {
  overall: { luck: number; text: string };
  luckyItem: string;
  luckyNumber: string;
}
interface UserInfo {
  name: string; year: string; month: string; day: string;
  bloodType: string; zodiacSign: string; eto: string;
}

// 2. データ (constants)
const BLOOD_TYPES = ["A", "B", "O", "AB"];

// 3. メインアプリ
export default function App() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: 'あなた', year: '1990', month: '1', day: '1',
    bloodType: BLOOD_TYPES[0], zodiacSign: "おひつじ座", eto: "子"
  });
  const [usageCount, setUsageCount] = useState(0);
  const [result, setResult] = useState<Fortune | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | null>('saved');
  const MAX_USAGE = 5;

  // 占い実行ロジック
  const handleSubmit = async () => {
    if (usageCount >= MAX_USAGE) return;
    setIsLoading(true);
    setAutoSaveStatus('saving');
    
    setTimeout(() => {
      setResult({
        overall: { luck: 5, text: "素晴らしい一日になります！" },
        luckyItem: "青いペン",
        luckyNumber: "7"
      });
      setUsageCount(prev => prev + 1);
      setIsLoading(false);
      setAutoSaveStatus('saved');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-cyan-400 mb-8">AI Fortune Teller</h1>
      
      <div className="w-full max-w-md bg-gray-900 p-6 rounded-2xl border border-white/10 space-y-4">
        <p className="text-center text-sm text-gray-400">本日の残り：{MAX_USAGE - usageCount}回</p>
        
        <input 
          className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700"
          value={userInfo.name}
          onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
          placeholder="お名前を入力"
        />

        <button 
          onClick={handleSubmit}
          disabled={isLoading || usageCount >= MAX_USAGE}
          className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 py-4 rounded-xl font-bold text-xl disabled:opacity-50"
        >
          {isLoading ? "鑑定中..." : "占う"}
        </button>

        {result && (
          <div className="mt-6 p-4 bg-white/5 rounded-lg border-l-4 border-purple-500 animate-pulse">
            <p className="text-lg">{result.overall.text}</p>
          </div>
        )}
      </div>

      {/* 自動保存ステータス表示 */}
      <div className="fixed bottom-4 right-4 text-[10px] text-gray-500 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${autoSaveStatus === 'saved' ? 'bg-green-500' : 'bg-yellow-500'}`} />
        {autoSaveStatus === 'saved' ? '自動保存済み' : '保存中...'}
      </div>
    </div>
  );
}
