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
      // 🌟 プルダウンの内容を確実にAIに読み取らせる命令文です
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `あなたは凄腕の占い師です。${name}さん（${bloodType}・${zodiac}）の運勢を占ってください。回答の冒頭で必ず「${zodiac}で${bloodType}の${name}さん、こんにちは！」と呼んでください。その後150文字程度で、具体的かつ元気が出るアドバイスとラッキーアイテムを教えて。` }] }]
        })
      });

      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (aiText) {
        setResult(aiText);
        setUsageCount(prev => prev + 1);
      } else {
        throw new Error();
      }
    } catch (error) {
      setResult("占い師が瞑想中です。VercelのEnvironment Variablesで NEXT_PUBLIC_GOOGLE_AI_API_KEY が正しく設定されているか確認して、Redeployしてみてね。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center font-sans">
      <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 mt-16 mb-10 py-2 tracking-tighter">
        AI Fortune Teller
      </h1>
      
      <div className="w-full max-w-md bg-white/5 p-8 rounded-3xl border border-white/10 shadow-[0_0_50px_-12px_rgba(168,85,247,0.2)] space-y-8 backdrop-blur-sm">
        <div className="flex justify-between items-center px-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400/80">Gemini 1.5 Connected</span>
          <span className="text-xs font-bold text-white/90 bg-white/10 px-3 py-1 rounded-full border border-white/5">
            残り {MAX_USAGE - usageCount} / {MAX_USAGE} 回
          </span>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] ml-1 text-gray-500 font-bold uppercase tracking-widest">Your Name</label>
            <input 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-900/50 p-4 rounded-xl border border-white/5 text-white outline-none" 
              placeholder="お名前を入力してください" 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] ml-1 text-gray-500 font-bold uppercase tracking-widest">Blood Type</label>
              <select value={bloodType} onChange={(e) => setBloodType(e.target.value)} className="w-full bg-gray-900/50 p-4 rounded-xl border border-white/5 text-gray-300 outline-none">
                <option value="A型">A型</option><option value="B型">B型</option><option value="O型">O型</option><option value="AB型">AB型</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] ml-1 text-gray-500 font-bold uppercase tracking-widest">Zodiac</label>
              <select value={zodiac} onChange={(e) => setZodiac(e.target.value)} className="w-full bg-gray-900/50 p-4 rounded-xl border border-white/5 text-gray-300 outline-none">
                <option value="牡羊座">牡羊座</option><option value="牡牛座">牡牛座</option><option value="双子座">双子座</option><option value="蟹座">蟹座</option>
                <option value="獅子座">獅子座</option><option value="乙女座">乙女座</option><option value="天秤座">天秤座</option><option value="蠍座">蠍座</option>
                <option value="射手座">射手座</option><option value="山羊座">山羊座</option><option value="水瓶座">水瓶座</option><option value="魚座">魚座</option>
              </select>
            </div>
          </div>
        </div>

        <button 
          onClick={handleFortune}
          disabled={isLoading || usageCount >= MAX_USAGE || !name}
          className="w-full bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 py-5 rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-purple-500/20 disabled:opacity-20"
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
            <p className="text-center text-lg leading-relaxed text-purple-100 font-medium whitespace-pre-wrap">{result}</p>
          </div>
        )}
      </div>

      <div className="mt-12 flex items-center gap-3 bg-white/5 px-5 py-2.5 rounded-full border border-white/5 text-[10px] text-gray-500 font-bold tracking-widest uppercase">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        System Operational
      </div>
    </div>
  );
}
