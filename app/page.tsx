"use client";
import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function FortuneApp() {
  const [result, setResult] = useState("");
  const fortunes = ["超ラッキー！最高の一日になります✨", "いい感じ！自分を信じて進もう👍", "今日はのんびり過ごすと運気が上がります🍵", "新しいことに挑戦するチャンス！🔥"];

  const drawFortune = () => {
    const random = fortunes[Math.floor(Math.random() * fortunes.length)];
    setResult(random);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '20px', backgroundColor: '#f0f4f8', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#2d3748' }}>✨ 今日の運勢占い ✨</h1>
      <button onClick={drawFortune} style={{ padding: '15px 30px', fontSize: '18px', cursor: 'pointer', backgroundColor: '#4299e1', color: 'white', border: 'none', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        占う！
      </button>
      {result && (
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', fontSize: '20px', fontWeight: 'bold' }}>
          {result}
        </div>
      )}
    </div>
  );
}
