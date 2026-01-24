"use client";
import React, { useState } from 'react';

export default function FortuneApp() {
  const [name, setName] = useState('');
  const [result, setResult] = useState("");

  const drawFortune = () => {
    const fortunes = ["超ラッキー！✨", "自分を信じて！🔥", "のんびりいこう☕"];
    setResult(fortunes[Math.floor(Math.random() * fortunes.length)]);
  };

  return (
    <div style={{ 
      backgroundColor: 'black', color: 'white', minHeight: '100vh', 
      fontFamily: 'sans-serif', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' 
    }}>
      {/* ヘッダーエリア */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '600px', marginBottom: '20px' }}>
        <h1 style={{ color: '#4fd1c5', fontSize: '24px' }}>AI Fortune Teller</h1>
        <button style={{ backgroundColor: '#4c51bf', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '5px' }}>取扱説明書</button>
      </div>

      {/* メインカード */}
      <div style={{ 
        backgroundColor: '#1a202c', border: '1px solid #2d3748', borderRadius: '20px', 
        padding: '30px', width: '100%', maxWidth: '600px' 
      }}>
        <h2 style={{ textAlign: 'center', color: '#d6bcfa', marginBottom: '20px' }}>占いたい方の情報を入力して下さい</h2>
        
        {/* 入力フォーム再現 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
          <div><label style={{ fontSize: '12px' }}>生年月日（年）</label>
            <select style={{ width: '100%', background: '#2d3748', color: 'white', padding: '8px' }}><option>1990</option></select>
          </div>
          <div><label style={{ fontSize: '12px' }}>月</label>
            <select style={{ width: '100%', background: '#2d3748', color: 'white', padding: '8px' }}><option>1</option></select>
          </div>
          <div><label style={{ fontSize: '12px' }}>日</label>
            <select style={{ width: '100%', background: '#2d3748', color: 'white', padding: '8px' }}><option>1</option></select>
          </div>
        </div>

        {/* 下段フォーム */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
          <div><label style={{ fontSize: '12px' }}>血液型</label>
            <select style={{ width: '100%', background: '#2d3748', color: 'white', padding: '8px' }}><option>不明</option></select>
          </div>
          <div><label style={{ fontSize: '12px' }}>星座</label>
            <select style={{ width: '100%', background: '#2d3748', color: 'white', padding: '8px' }}><option>不明</option></select>
          </div>
          <div><label style={{ fontSize: '12px' }}>干支</label>
            <select style={{ width: '100%', background: '#2d3748', color: 'white', padding: '8px' }}><option>不明</option></select>
          </div>
        </div>

        {/* 占う日・残り回数 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', backgroundColor: '#171923', padding: '5px', borderRadius: '10px' }}>
           <button style={{ flex: 1, background: '#4c51bf', border: 'none', color: 'white', padding: '10px', borderRadius: '8px' }}>今日</button>
           <button style={{ flex: 1, background: 'transparent', border: 'none', color: '#718096', padding: '10px' }}>明日</button>
           <span style={{ color: '#4fd1c5', fontSize: '12px' }}>本日の残り：5回</span>
        </div>

        <div style={{ textAlign: 'right', marginBottom: '20px' }}>
          <button style={{ backgroundColor: '#2d3748', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '8px' }}>入力を固定する</button>
        </div>

        {/* 運勢を占うボタン（グラデーション） */}
        <button 
          onClick={drawFortune}
          style={{ 
            width: '100%', padding: '15px', borderRadius: '10px', border: 'none', fontWeight: 'bold', fontSize: '18px', color: 'white',
            background: 'linear-gradient(90deg, #ed64a6 0%, #667eea 50%, #00b5d8 100%)', cursor: 'pointer'
          }}
        >
          運勢を占う
        </button>
      </div>

      {/* 占い結果表示エリア */}
      {result && (
        <div style={{ marginTop: '20px', padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', fontSize: '20px' }}>
          {result}
        </div>
      )}

      {/* mike ver.1 ロゴ */}
      <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
          <span style={{ color: '#f6ad55' }}>m</span>
          <span style={{ color: '#4fd1c5' }}>i</span>
          <span style={{ color: '#f6e05e' }}>★</span>
          <span style={{ color: '#667eea' }}>ke</span>
        </div>
        <span style={{ color: '#718096' }}>ver.1</span>
      </div>
    </div>
  );
}
