"use client";

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Home() {
  const [targetDay, setTargetDay] = useState("今日");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const tellFortune = async () => {
    setLoading(true);
    try {
      // 安全なAPIキー読み込み
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey || "");
      // Google AI Studio一致モデル
      const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

      const prompt = "本格的な占い結果を200文字程度で出力してください。";
      const res = await model.generateContent(prompt);
      setResult(res.response.text());
    } catch (e) {
      setResult("エラーが発生しました。");
    }
    setLoading(false);
  };

  return (
    <main style={{ backgroundColor: '#000', minHeight: '100-vh', color: '#fff', padding: '20px', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* 取扱説明書ボタン */}
      <div style={{ width: '100%', maxWidth: '400px', display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <button style={{ backgroundColor: '#1e1e1e', border: '1px solid #444', color: '#fff', borderRadius: '4px', padding: '4px 10px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}>
          📖 取扱説明書
        </button>
      </div>

      {/* メインタイトル */}
      <h1 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '30px', background: 'linear-gradient(to right, #bca1ff, #7eb6ff, #6ffffa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        AI Fortune Teller
      </h1>

      {/* 入力カード */}
      <div style={{ width: '100%', maxWidth: '380px', backgroundColor: '#121214', borderRadius: '16px', padding: '30px', border: '1px solid #222', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
        
        <p style={{ textAlign: 'center', color: '#ffd1ff', fontSize: '14px', marginBottom: '25px', fontWeight: 'bold' }}>占いたい方の情報を入力して下さい</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* 氏名 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '11px', color: '#888' }}>氏名</label>
            <input type="text" placeholder="セキュリティ保護のため入力不可" style={{ backgroundColor: '#1a1a1c', border: '1px solid #333', borderRadius: '6px', padding: '12px', color: '#fff', fontSize: '14px' }} />
          </div>

          {/* 生年月日 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '11px', color: '#888' }}>生年月日</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              <select style={{ backgroundColor: '#1a1a1c', border: '1px solid #333', color: '#fff', padding: '8px', borderRadius: '4px' }}><option>1996</option></select>
              <select style={{ backgroundColor: '#1a1a1c', border: '1px solid #333', color: '#fff', padding: '8px', borderRadius: '4px' }}><option>1</option></select>
              <select style={{ backgroundColor: '#1a1a1c', border: '1px solid #333', color: '#fff', padding: '8px', borderRadius: '4px' }}><option>1</option></select>
            </div>
          </div>

          {/* 血液型・星座・干支 */}
          {['血液型', '星座', '干支'].map((label) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '11px', color: '#888' }}>{label}</label>
              <select style={{ backgroundColor: '#1a1a1c', border: '1px solid #333', color: '#fff', padding: '8px', borderRadius: '4px' }}>
                <option>{label === '血液型' ? 'A' : label === '星座' ? '山羊座' : '子（ね）'}</option>
              </select>
            </div>
          ))}

          {/* 占う日スイッチ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '11px', color: '#888' }}>占う日</label>
            <div style={{ display: 'flex', backgroundColor: '#1a1a1c', borderRadius: '6px', border: '1px solid #333', overflow: 'hidden' }}>
              <button onClick={() => setTargetDay("今日")} style={{ flex: 1, padding: '10px', fontSize: '13px', border: 'none', backgroundColor: targetDay === "今日" ? '#3e4491' : 'transparent', color: '#fff' }}>今日</button>
              <button onClick={() => setTargetDay("明日")} style={{ flex: 1, padding: '10px', fontSize: '13px', border: 'none', backgroundColor: targetDay === "明日" ? '#3e4491' : 'transparent', color: '#fff' }}>明日</button>
            </div>
          </div>

          <p style={{ textAlign: 'center', color: '#00f2ff', fontSize: '11px', fontWeight: 'bold', marginTop: '10px' }}>本日の残り利用回数：5回</p>

          <button style={{ backgroundColor: '#343a40', color: '#ccc', padding: '10px', borderRadius: '6px', border: '1px solid #444', fontWeight: 'bold', fontSize: '13px' }}>
            入力を固定する
          </button>

          {/* 鑑定ボタン（グラデーション） */}
          <button 
            onClick={tellFortune}
            disabled={loading}
            style={{ 
              background: 'linear-gradient(to right, #ff4eb0, #9d50bb, #00d2ff)', 
              color: '#fff', padding: '15px', borderRadius: '10px', border: 'none', 
              fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(157, 80, 187, 0.4)' 
            }}>
            {loading ? "鑑定中..." : "運勢を占う"}
          </button>
        </div>
      </div>

      {result && (
        <div style={{ width: '100%', maxWidth: '380px', marginTop: '20px', backgroundColor: '#121214', padding: '20px', borderRadius: '16px', border: '1px solid rgba(157, 80, 187, 0.3)' }}>
          <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#eee' }}>{result}</p>
        </div>
      )}
    </main>
  );
}
