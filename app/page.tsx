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

      const prompt = `本格的な占い師として、${targetDay}の運勢を200文字程度で鑑定してください。名前:${name}, 生年月日:${birthYear}/${birthMonth}/${birthDay}, 血液型:${bloodType}, 星座:${zodiac}, 干支:${eto}`;
      const res = await model.generateContent(prompt);
      setResult(res.response.text());
    } catch (e) {
      setResult("鑑定に失敗しました。1日5回の制限か通信状態を確認してください。");
    }
    setLoading(false);
  };

  return (
    <main style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff', padding: '20px', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div style={{ width: '100%', maxWidth: '400px', display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <button style={{ backgroundColor: '#2d2d3d', border: '1px solid #444', color: '#fff', borderRadius: '6px', padding: '6px 12px', fontSize: '12px' }}>📖 取扱説明書</button>
      </div>

      <h1 style={{ fontSize: '38px', fontWeight: '900', marginBottom: '30px', background: 'linear-gradient(to right, #bca1ff, #7eb6ff, #6ffffa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-1px' }}>AI Fortune Teller</h1>

      <div style={{ width: '100%', maxWidth: '380px', backgroundColor: '#161618', borderRadius: '20px', padding: '30px', border: '1px solid #282828' }}>
        <p style={{ textAlign: 'center', color: '#ffd1ff', fontSize: '14px', marginBottom: '30px', fontWeight: 'bold' }}>占いたい方の情報を入力して下さい</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          
          {/* 氏名 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', color: '#888' }}>氏名</label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="セキュリティ保護のため入力不可" style={{ boxSizing: 'border-box', width: '100%', backgroundColor: '#1c1c1e', border: '1px solid #333', borderRadius: '8px', padding: '14px', color: '#fff' }} />
          </div>

          {/* 生年月日（すべての数字を直書き） */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', color: '#888' }}>生年月日</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              <select value={birthYear} onChange={(e)=>setBirthYear(e.target.value)} style={{ backgroundColor: '#1c1c1e', border: '1px solid #333', color: '#fff', padding: '10px', borderRadius: '8px' }}>
                <option value="1990">1990</option><option value="1991">1991</option><option value="1992">1992</option><option value="1993">1993</option><option value="1994">1994</option><option value="1995">1995</option><option value="1996">1996</option><option value="1997">1997</option><option value="1998">1998</option><option value="1999">1999</option><option value="2000">2000</option><option value="2010">2010</option><option value="2020">2020</option><option value="2025">2025</option><option value="2026">2026</option>
              </select>
              <select value={birthMonth} onChange={(e)=>setBirthMonth(e.target.value)} style={{ backgroundColor: '#1c1c1e', border: '1px solid #333', color: '#fff', padding: '10px', borderRadius: '8px' }}>
                <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option>
              </select>
              <select value={birthDay} onChange={(e)=>setBirthDay(e.target.value)} style={{ backgroundColor: '#1c1c1e', border: '1px solid #333', color: '#fff', padding: '10px', borderRadius: '8px' }}>
                <option value="1">1</option><option value="5">5</option><option value="10">10</option><option value="15">15</option><option value="20">20</option><option value="25">25</option><option value="31">31</option>
              </select>
            </div>
          </div>

          {/* 血液型 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', color: '#888' }}>血液型</label>
            <select value={bloodType} onChange={(e)=>setBloodType(e.target.value)} style={{ width: '100%', backgroundColor: '#1c1c1e', border: '1px solid #333', color: '#fff', padding: '10px', borderRadius: '8px' }}>
              <option value="A">A</option><option value="B">B</option><option value="O">O</option><option value="AB">AB</option>
            </select>
          </div>

          {/* 星座 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', color: '#888' }}>星座</label>
            <select value={zodiac} onChange={(e)=>setZodiac(e.target.value)} style={{ width: '100%', backgroundColor: '#1c1c1e', border: '1px solid #333', color: '#fff', padding: '10px', borderRadius: '8px' }}>
              <option value="山羊座">山羊座</option><option value="水瓶座">水瓶座</option><option value="魚座">魚座</option><option value="牡羊座">牡羊座</option><option value="牡牛座">牡牛座</option><option value="双子座">双子座</option><option value="蟹座">蟹座</option><option value="獅子座">獅子座</option><option value="乙女座">乙女座</option><option value="天秤座">天秤座</option><option value="蠍座">蠍座</option><option value="射手座">射手座</option>
            </select>
          </div>

          {/* 干支 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', color: '#888' }}>干支</label>
            <select value={eto} onChange={(e)=>setEto(e.target.value)} style={{ width: '100%', backgroundColor: '#1c1c1e', border: '1px solid #333', color: '#fff', padding: '10px', borderRadius: '8px' }}>
              <option value="子（ね）">子（ね）</option><option value="丑（うし）">丑（うし）</option><option value="寅（とら）">寅（とら）</option><option value="卯（う）">卯（う）</option><option value="辰（たつ）">辰（たつ）</option><option value="巳（み）">巳（み）</option><option value="午（うま）">午（うま）</option><option value="未（ひつじ）">未（ひつじ）</option><option value="申（さる）">申（さる）</option><option value="酉（とり）">酉（とり）</option><option value="戌（いぬ）">戌（いぬ）</option><option value="亥（い）">亥（い）</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', color: '#888' }}>占う日</label>
            <div style={{ display: 'flex', backgroundColor: '#1c1c1e', borderRadius: '10px', border: '1px solid #333', padding: '4px' }}>
              <button onClick={() => setTargetDay("今日")} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '6px', backgroundColor: targetDay === "今日" ? '#3e4491' : 'transparent', color: '#fff', fontWeight: 'bold' }}>今日</button>
              <button onClick={() => setTargetDay("明日")} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '6px', backgroundColor: targetDay === "明日" ? '#3e4491' : 'transparent', color: '#fff', fontWeight: 'bold' }}>明日</button>
            </div>
          </div>

          <p style={{ textAlign: 'center', color: '#00f2ff', fontSize: '12px', fontWeight: 'bold' }}>本日の残り利用回数：5回</p>
          <button style={{ backgroundColor: '#343a40', color: '#ccc', padding: '12px', borderRadius: '10px', border: '1px solid #444', fontWeight: 'bold' }}>入力を固定する</button>
          <button onClick={tellFortune} disabled={loading} style={{ background: 'linear-gradient(to right, #ff4eb0, #9d50bb, #00d2ff)', color: '#fff', padding: '16px', borderRadius: '12px', border: 'none', fontWeight: 'bold', fontSize: '16px' }}>
            {loading ? "鑑定中..." : "運勢を占う"}
          </button>
        </div>
      </div>

      {result && (
        <div style={{ width: '100%', maxWidth: '380px', marginTop: '25px', backgroundColor: '#161618', padding: '25px', borderRadius: '20px', border: '1px solid rgba(157, 80, 187, 0.4)' }}>
          <p style={{ fontSize: '15px', lineHeight: '1.7', color: '#eee' }}>{result}</p>
        </div>
      )}
    </main>
  );
}
