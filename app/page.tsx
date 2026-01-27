"use client";

import React, { useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';

export default function App() {
  const [name, setName] = useState('');
  const [bloodType, setBloodType] = useState('A型');
  const [zodiac, setZodiac] = useState('牡羊座');
  const [usageCount, setUsageCount] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const MAX_USAGE = 5;

  const handleFortune = async () => {
    if (usageCount >= MAX_USAGE || !name) return;
    setIsLoading(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `あなたは一流の占い師です。${name}さん（${bloodType}・${zodiac}）を占って。冒頭で必ず「${zodiac}で${bloodType}の${name}さん」と呼びかけてから、150文字程度で占ってください。` }] }]
        })
      });
      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (aiText) { setResult(aiText); setUsageCount(prev => prev + 1); }
      else { throw new Error(); }
    } catch (error) {
      setResult("VercelのEnvironment Variablesで NEXT_PUBLIC_GOOGLE_AI_API_KEY を設定し、Redeployしてください。");
    } finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mt-10 mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">AI Fortune Teller</h1>
      <div className="w-full max-w-md bg-white/5 p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="flex justify-between text-xs font-bold text-gray-400">
          <span>Gemini 1.5 Active</span>
          <span>残り {MAX_USAGE - usageCount} / {MAX_USAGE} 回</span>
        </div>
        <div className="space-y-4">
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-gray-900 p-4 rounded-xl border border-white/5 outline-none" placeholder="お名前を入力" />
          <div className="grid grid-cols-2 gap-4">
            <select value={bloodType} onChange={(e) => setBloodType(e.target.value)} className="bg-gray-900 p-4 rounded-xl border border-white/5 outline-none text-white">
              <option value="A型">A型</option><option value="B型">B型</option><option value="O型">O型</option><option value="AB型">AB型</option>
            </select>
            <select value={zodiac} onChange={(e) => setZodiac(e.target.value)} className="bg-gray-900 p-4 rounded-xl border border-white/5 outline-none text-white">
              <option value="牡羊座">牡羊座</option><option value="牡牛座">牡牛座</option><option value="双子座">双子座</option><option value="蟹座">蟹座</option>
              <option value="獅子座">獅子座</option><option value="乙女座">乙女座</option><option value="天秤座">天秤座</option><option value="蠍座">蠍座</option>
              <option value="射手座">射手座</option><option value="山羊座">山羊座</option><option value="水瓶座">水瓶座</option><option value="魚座">魚座</option>
            </select>
          </div>
        </div>
        <button onClick={handleFortune} disabled={isLoading || usageCount >= MAX_USAGE || !name} className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 py-4 rounded-2xl font-bold text-lg hover:opacity-90 active:scale-95 transition-all">
          {isLoading ? <Loader2 className="mx-auto animate-spin" /> : "鑑定を開始する"}
        </button>
        {result && <div className="mt-6 p-6 bg-white/5 border border-purple-500/30 rounded-2xl text-purple-100">{result}</div>}
      </div>
    </div>
  );
}
