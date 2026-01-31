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

  // 選択肢のデータ
  const years = Array.from({ length: 77 }, (_, i) => (1950 + i).toString());
  const months = Array.from({ length: 12 }, (_, i) => (1 + i).toString());
  const days = Array.from({ length: 31 }, (_, i) => (1 + i).toString());
  const bloodTypes = ["A", "B", "O", "AB"];
  const zodiacs = ["牡羊座", "牡牛座", "双子座", "蟹座", "獅子座", "乙女座", "天秤座", "蠍座", "射手座", "山羊座", "水瓶座", "魚座"];
  const etos = ["子（ね）", "丑（うし）", "寅（とら）", "卯（う）", "辰（たつ）", "巳（み）", "午（うま）", "未（ひつじ）", "申（さる）", "酉（とり）", "戌（いぬ）", "亥（い）"];

  const tellFortune = async () => {
    setLoading(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey || "");
      const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

      const prompt = `
        以下の情報に基づき、${targetDay}の運勢を本格的な占い師として200文字程度で鑑定してください。
        名前：${name || "未入力"}
        生年月日：${birthYear}年${birthMonth}月${birthDay}日
        血液型：${bloodType}型
        星座：${zodiac}
        干支：${eto}
      `;

      const res = await model.generateContent(prompt);
      setResult(res.response.text());
    } catch (e) {
      setResult("鑑定に失敗しました。1日5回の制限に達したか、通信エラーの可能性があります。");
    }
    setLoading(false);
  };

  return (
    <main style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff', padding: '20px', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div style={{ width: '100%', maxWidth: '400px', display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <button style={{ backgroundColor: '#1e1e1e', border: '1px solid #444', color: '#fff', borderRadius: '4px', padding: '4px 10px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}>
          📖 取扱説明書
        </button>
      </div>

      <h1 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '30px', background: 'linear-gradient(to right, #bca1ff, #7eb6ff, #6ffffa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        AI Fortune Teller
      </h1>

      <div style={{ width: '100%', maxWidth: '380px', backgroundColor: '#121214', borderRadius: '16px', padding: '30px', border: '1px solid #222', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
        
        <p style={{ textAlign: 'center', color: '#ffd1ff', fontSize: '14px', marginBottom: '25px', fontWeight: 'bold' }}>占いたい方の情報を入力して下さい</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div>
            <label style={{ fontSize: '11px', color: '#888' }}>氏名</label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="セキュリティ保護のため入力不可" style={{ width: '100%', boxSizing: 'border-box', backgroundColor: '#1a1a1c', border: '1px solid #333', borderRadius: '6px', padding: '12px', color: '#fff', fontSize: '14px' }} />
          </div>

          <div>
            <label style={{ fontSize: '11px', color: '#888' }}>生年月日</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              <select value={birthYear} onChange={(e)=>setBirthYear(e.target.value)} style={{ backgroundColor: '#1a1a1c', border: '1px solid #333', color: '#fff', padding: '8px', borderRadius: '4px' }}>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <select value={birthMonth} onChange={(e)=>setBirthMonth(e.target.value)} style={{ backgroundColor: '#1a1a1c', border: '1px solid #333', color: '#fff', padding: '8px', borderRadius: '4px' }}>
                {months.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <select value={birthDay} onChange={(e)=>setBirthDay(e.target.value)} style={{ backgroundColor: '#1a1a1c', border: '1px solid #333', color: '#fff', padding: '8px', borderRadius: '4px' }}>
                {days.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '11px', color: '#888' }}>血液型</label>
            <select value={bloodType} onChange={(e)=>setBloodType(e.target.value)} style={{ width: '100%', backgroundColor: '#1a1a1c', border: '1px solid #333', color: '#fff', padding: '8px', borderRadius: '4px' }}>
              {bloodTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '11px', color: '#888' }}>星座</label>
            <select value={zodiac} onChange={(e)=>setZodiac(e.target.value)} style={{ width: '100%', backgroundColor: '#1a1a1c', border: '1px solid #333', color: '#fff', padding: '8px', borderRadius: '4px' }}>
              {zodiacs.map(z => <option key={z} value={z}>{z}</option>)}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '11px', color: '#888' }}>干支</label>
            <select value={eto} onChange={(e)=>setEto(e.target.value)} style={{ width: '100%', backgroundColor: '#1a1a1c', border: '1px solid #333', color: '#fff', padding: '8px', borderRadius: '4px' }}>
              {etos.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '11px', color: '#888' }}>占う日</label>
            <div style={{ display: 'flex', backgroundColor: '#1a1a1c', borderRadius: '6px', border: '1px solid #333', overflow: 'hidden' }}>
              <button onClick={() => setTargetDay("今日")} style={{ flex: 1, padding: '10px', fontSize: '13px', border: 'none', backgroundColor: targetDay === "今日" ? '#3e4491' : 'transparent', color: '#fff', cursor: 'pointer' }}>今日</button>
              <button onClick={() => setTargetDay("明日")} style={{ flex: 1, padding: '10px', fontSize: '13px', border: 'none', backgroundColor: targetDay === "明日" ? '#3e4491' : 'transparent', color: '#fff', cursor: 'pointer' }}>明日</button>
            </div>
          </div>

          <p style={{ textAlign: 'center', color: '#00f2ff', fontSize: '11px', fontWeight: 'bold', marginTop: '10px' }}>本日の残り利用回数：5回</p>

          <button style={{ backgroundColor: '#343a40', color: '#ccc', padding: '10px', borderRadius: '6px', border: '1px solid #444', fontWeight: 'bold', fontSize: '13px' }}>
            入力を固定する
          </button>

          <button onClick={tellFortune} disabled={loading} style={{ background: 'linear-gradient(to right, #ff4eb0, #9d50bb, #00d2ff)', color: '#fff', padding: '15px', borderRadius: '10px', border: 'none', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(157, 80, 187, 0.4)' }}>
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
