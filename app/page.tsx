"use client";

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Home() {
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("1996");
  const [birthMonth, setBirthMonth] = useState("1");
  const [birthDay, setBirthDay] = useState("1");
  const [bloodType, setBloodType] = useState("A");
  const [zodiac, setZodiac] = useState("山羊座");
  const [eto, setEto] = useState("子（ね）");
  const [targetDay, setTargetDay] = useState("今日");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const tellFortune = async () => {
    setLoading(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey || "");
      const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
      const prompt = `占い師として鑑定。名前:${name}, 生年月日:${birthYear}/${birthMonth}/${birthDay}, 血液型:${bloodType}, 星座:${zodiac}, 干支:${eto}, ${targetDay}の運勢。`;
      const res = await model.generateContent(prompt);
      setResult(res.response.text());
    } catch (e) {
      setResult("エラー。1日5回制限の可能性があります。");
    }
    setLoading(false);
  };

  // PCでもスマホでも「見える」ためのスタイル
  const selectStyle = {
    width: '100%',
    backgroundColor: '#ffffff', // 背景を白に固定
    color: '#000000',           // 文字を黒に固定
    padding: '12px',
    borderRadius: '8px',
    border: '2px solid #333',
    fontSize: '16px',
    cursor: 'pointer'
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff', padding: '20px' }}>
      <div style={{ maxWidth: '380px', margin: '0 auto' }}>
        
        <h1 style={{ textAlign: 'center', fontSize: '32px', background: 'linear-gradient(to right, #bca1ff, #7eb6ff, #6ffffa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '20px' }}>AI Fortune Teller</h1>

        <div style={{ backgroundColor: '#161618', borderRadius: '20px', padding: '25px', border: '1px solid #282828' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            <label style={{ fontSize: '12px', color: '#888' }}>生年月日</label>
            <div style={{ display: 'flex', gap: '5px' }}>
              <select value={birthYear} onChange={(e)=>setBirthYear(e.target.value)} style={selectStyle}>
                <option value="1996">1996年</option><option value="2000">2000年</option><option value="2026">2026年</option>
              </select>
            </div>

            <label style={{ fontSize: '12px', color: '#888' }}>血液型</label>
            <select value={bloodType} onChange={(e)=>setBloodType(e.target.value)} style={selectStyle}>
              <option value="A">A型</option><option value="B">B型</option><option value="O">O型</option><option value="AB">AB型</option>
            </select>

            <label style={{ fontSize: '12px', color: '#888' }}>干支</label>
            <select value={eto} onChange={(e)=>setEto(e.target.value)} style={selectStyle}>
              <option value="子（ね）">子（ね）</option>
              <option value="丑（うし）">丑（うし）</option>
              <option value="寅（とら）">寅（とら）</option>
            </select>

            <p style={{ textAlign: 'center', color: '#00f2ff', fontSize: '12px' }}>本日の残り利用回数：5回</p>

            <button onClick={tellFortune} style={{ background: 'linear-gradient(to right, #ff4eb0, #9d50bb, #00d2ff)', color: '#fff', padding: '15px', borderRadius: '12px', border: 'none', fontWeight: 'bold' }}>
              {loading ? "鑑定中..." : "運勢を占う"}
            </button>
          </div>
        </div>

        {result && <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #444', borderRadius: '15px' }}>{result}</div>}
      </div>
    </div>
  );
}
