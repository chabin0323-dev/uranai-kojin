"use client";
import React, { useState } from 'react';

export default function FortuneApp() {
  const [name, setName] = useState('');
  const [result, setResult] = useState("");

  // Historyで見つけた、あなたが考えた占いメッセージ
  const fortunes = [
    "超ラッキー！最高の一日になります✨",
    "いい感じ！自分を信じて進もう🔥",
    "今日はのんびり過ごすと運気が上がります☕",
    "新しいことに挑戦するチャンス！🔥"
  ];

  const drawFortune = () => {
    if (!name) return alert("名前を入れてね！");
    const random = fortunes[Math.floor(Math.random() * fortunes.length)];
    setResult(random);
  };

  return (
    <div style={{ 
      padding: '40px', 
      textAlign: 'center', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // 豪華な背景
      color: 'white',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
        🌟 私の占いアプリ 🌟
      </h1>
      
      <div style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.2)', 
        padding: '30px', 
        borderRadius: '20px', 
        backdropFilter: 'blur(10px)',
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        <input
          type="text"
          placeholder="あなたの名前を入れてね"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ 
            width: '80%', 
            padding: '15px', 
            borderRadius: '30px', 
            border: 'none', 
            fontSize: '18px',
            marginBottom: '20px'
          }}
        />
        <br />
        <button 
          onClick={drawFortune}
          style={{ 
            padding: '15px 40px', 
            fontSize: '20px', 
            cursor: 'pointer', 
            borderRadius: '30px', 
            backgroundColor: '#FFD700', 
            border: 'none',
            color: '#333',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}
        >
          運勢を占う！
        </button>

        {result && (
          <div style={{ 
            marginTop: '30px', 
            padding: '20px', 
            backgroundColor: 'rgba(255,255,255,0.9)', 
            borderRadius: '15px', 
            color: '#764ba2',
            fontSize: '24px', 
            fontWeight: 'bold' 
          }}>
            {name}さん：{result}
          </div>
        )}
      </div>
    </div>
  );
}
