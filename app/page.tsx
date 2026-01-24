"use client";
import React, { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const fortuneList = [
    "今日は最高の一日！新しいことに挑戦してみて。",
    "ラッキーアイテムは『青いペン』。集中力がアップします。",
    "一息つくのが吉。温かい飲み物を飲んでリラックス。",
    "思わぬところから幸運が舞い込む予感！",
    "今日は聞き手に回ると、良い人間関係が築けそう。"
  ];

  const handleFortune = () => {
    if (!name) return alert("名前を入力してね！");
    setLoading(true);
    // AI風の演出（1秒待つ）
    setTimeout(() => {
      const randomResult = fortuneList[Math.floor(Math.random() * fortuneList.length)];
      setResult(`${name}さんの今日の運勢： ${randomResult}`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif', backgroundColor: '#f9f5ff', minHeight: '100vh' }}>
      <h1 style={{ color: '#7c3aed', marginBottom: '30px' }}>🌟 AI占いアプリ 🌟</h1>
      
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxWidth: '400px', margin: '0 auto' }}>
        <input
          type="text"
          placeholder="あなたの名前を入れてね"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }}
        />
        
        <button
          onClick={handleFortune}
          disabled={loading}
          style={{ width: '100%', padding: '12px', backgroundColor: '#7c3aed', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
        >
          {loading ? '占い中...' : '運勢を占う！'}
        </button>

        {result && (
          <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f3f0ff', borderRadius: '10px', color: '#5b21b6', fontWeight: 'bold', lineHeight: '1.6' }}>
            {result}
          </div>
        )}
      </div>
      
      <p style={{ marginTop: '40px', color: '#6b7280', fontSize: '14px' }}>
        ※これは「Ready」を維持するための安定版コードです
      </p>
    </div>
  );
}
