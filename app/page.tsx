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

  // 選択肢のリストを直接定義（確実に表示させるため）
  const years = ["1945", "1950", "1960", "1970", "1980", "1990", "1996", "2000", "2010", "2020", "2025", "2026"];
  const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const days = ["1", "2", "3", "4", "5", "10", "15", "20", "25", "30", "31"];
  const bloodTypes = ["A", "B", "O", "AB"];
  const zodiacs = ["牡羊座", "牡牛座", "双子座", "蟹座", "獅子座", "乙女座", "天秤座", "蠍座", "射手座", "山羊座", "水瓶座", "魚座"];
  const etos = ["子（ね）", "丑（うし）", "寅（とら）", "卯（う）", "辰（たつ）", "巳（み）", "午（うま）", "未（ひつじ）", "申（さる）", "酉（とり）", "戌（いぬ）", "亥（い）"];

  const tellFortune = async () => {
    setLoading(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey || "");
      // 最新のGemini 3モデルを指定
      const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

      const prompt = `本格的な占い師として鑑定してください。名前:${name}, 生年月日:${birthYear}/${birthMonth}/${birthDay}, 血液型:${bloodType}, 星座:${zodiac}, 干支:${eto}, ${targetDay}の運勢を200文字で。`;
      const res = await model.generateContent(prompt);
      setResult(res.response.text());
    } catch (e) {
      setResult("エラーが発生しました。1日5回の制限を確認してください。");
    }
    setLoading(false);
  };

  return (
    <main style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff', padding: '20px', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* 右上の取扱説明書 */}
      <div style={{ width: '100%', maxWidth: '400px', display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <button style={{ backgroundColor: '#2d2d3d', border: '1px solid #444', color: '#fff', borderRadius: '6px', padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}>
          📖 取扱説明書
        </button>
      </div>

      <h1 style={{ fontSize: '38px', fontWeight: '900', marginBottom: '30px', background: 'linear-gradient(to right, #bca1ff, #7eb6ff, #6ffffa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-1px' }}>
        AI Fortune Teller
      </h1>

      <div style={{ width: '100%', maxWidth: '380px', backgroundColor: '#161618', borderRadius: '20px', padding: '30px', border: '1px solid #282828', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}>
        
        <p style={{ textAlign: 'center', color: '#ffd1ff', fontSize: '14px', marginBottom: '30px', fontWeight: 'bold' }}>占いたい方の情報を入力して下さい</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', color: '#888' }}>氏名</label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="セキュリティ保護のため入力不可" style={{ boxSizing: 'border-box', width: '100%', backgroundColor: '#1c1c1e', border: '1px solid #333', borderRadius: '8px', padding: '14px', color: '#fff', fontSize: '14px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', color: '#888' }}>生年月日</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              <select value={birthYear} onChange={(e)=>setBirthYear(e.target.value)} style={{ backgroundColor: '#1c1c1e', border: '1px solid #333', color: '#fff', padding: '10px', borderRadius: '8px' }}>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <select value={birthMonth} onChange={(e)=>setBirthMonth(e.target.value)} style={{ backgroundColor: '#1c1c1e', border: '1px solid #333', color: '#fff', padding: '10px', borderRadius: '8px' }}>
                {months.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <select value={birthDay} onChange={(e)=>setBirthDay(e.target.value)} style={{ backgroundColor: '#1c1c1e', border: '1px solid #333', color: '#fff', padding: '10px', borderRadius: '8px' }}>
                {days.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          {[
            {label:'血液型', val:bloodType, set:setBloodType, list:bloodTypes},
            {label:'星座', val:zodiac, set:setZodiac, list:zodiacs},
            {label:'干支', val:eto, set:setEto, list:etos}
          ].map((item) => (
            <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', color: '#888' }}>{item.label}</label>
              <select value={item.val} onChange={(e)=>item.set(e.target.value)} style={{ width: '100%', backgroundColor: '#1c1c1e', border: '1px solid #333', color: '#fff', padding: '10px', borderRadius: '8px' }}>
                {item.list.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          ))}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', color: '#888' }}>占う日</label>
            <div style={{ display: 'flex', backgroundColor: '#1c1c1e', borderRadius: '10px', border: '1px solid #333', overflow: 'hidden', padding: '4px' }}>
              <button onClick={() => setTargetDay("今日")} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '6px', backgroundColor: targetDay === "今日" ? '#3e4491' : 'transparent', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>今日</button>
              <button onClick={() => setTargetDay("明日")} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '6px', backgroundColor: targetDay === "明日" ? '#3e4491' : 'transparent', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>明日</button>
            </div>
          </div>

          <p style={{ textAlign: 'center', color: '#00f2ff', fontSize: '12px', fontWeight: 'bold', marginTop: '10px' }}>本日の残り利用回数：5回</p>

          <button style={{ backgroundColor: '#343a40', color: '#ccc', padding: '12px', borderRadius: '10px', border: '1px solid #444', fontWeight: 'bold', fontSize: '14px' }}>
            入力を固定する
          </button>

          <button onClick={tellFortune} disabled={loading} style={{ background: 'linear-gradient(to right, #ff4eb0, #9d50bb, #00d2ff)', color: '#fff', padding: '16px', borderRadius: '12px', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 20px rgba(157, 80, 187, 0.4)' }}>
            {loading ? "鑑定中..." : "運勢を占う"}
          </button>
        </div>
      </div>

      {result && (
        <div style={{ width: '100%', maxWidth: '380px', marginTop: '25px', backgroundColor: '#161618', padding: '25px', borderRadius: '20px', border: '1px solid rgba(157, 80, 187, 0.4)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          <p style={{ fontSize: '15px', lineHeight: '1.7', color: '#eee' }}>{result}</p>
        </div>
      )}
    </main>
  );
}
