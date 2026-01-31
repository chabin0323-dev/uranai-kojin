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
      const prompt = `プロの占い師として。名前:${name}, 生年月日:${birthYear}/${birthMonth}/${birthDay}, 血液型:${bloodType}, 星座:${zodiac}, 干支:${eto}, ${targetDay}の運勢。`;
      const res = await model.generateContent(prompt);
      setResult(res.response.text());
    } catch (e) {
      setResult("エラー。1日5回制限の可能性があります。");
    }
    setLoading(false);
  };

  // どの環境でも絶対に見えるプルダウンのスタイル
  const selectStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#ffffff', // 背景を白に固定して「白紙」を防ぐ
    color: '#000000',           // 文字を黒に固定
    padding: '12px',
    borderRadius: '10px',
    border: '2px solid #444',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    appearance: 'auto'          // PCのブラウザ標準の矢印を出す
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff', padding: '20px', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* 取扱説明書ボタン */}
      <div style={{ width: '100%', maxWidth: '400px', display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <button style={{ background: 'linear-gradient(45deg, #7b2ff7, #2196f3)', border: 'none', color: '#fff', borderRadius: '8px', padding: '8px 16px', fontWeight: 'bold', fontSize: '13px' }}>
          📖 取扱説明書
        </button>
      </div>

      <h1 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '20px', background: 'linear-gradient(to right, #bca1ff, #7eb6ff, #6ffffa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-1px' }}>
        AI Fortune Teller
      </h1>

      {/* メインカード：幅をしっかり400pxに固定 */}
      <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#161618', borderRadius: '24px', padding: '30px', border: '1px solid #282828', boxSizing: 'border-box' }}>
        
        <p style={{ textAlign: 'center', color: '#ffd1ff', fontSize: '15px', marginBottom: '30px', fontWeight: 'bold' }}>占いたい方の情報を入力して下さい</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          
          {/* 氏名 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '12px', color: '#888' }}>氏名</label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="セキュリティ保護のため入力不可" style={{ ...selectStyle, boxSizing: 'border-box' }} />
          </div>

          {/* 生年月日 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '12px', color: '#888' }}>生年月日</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '10px' }}>
              <select value={birthYear} onChange={(e)=>setBirthYear(e.target.value)} style={selectStyle}>
                <option value="1996">1996年</option><option value="2000">2000年</option><option value="2026">2026年</option>
              </select>
              <select value={birthMonth} onChange={(e)=>setBirthMonth(e.target.value)} style={selectStyle}>
                <option value="1">1月</option><option value="12">12月</option>
              </select>
              <select value={birthDay} onChange={(e)=>setBirthDay(e.target.value)} style={selectStyle}>
                <option value="1">1日</option><option value="31">31日</option>
              </select>
            </div>
          </div>

          {/* 血液型・星座・干支 */}
          {[
            { label: '血液型', val: bloodType, set: setBloodType, list: ["A", "B", "O", "AB"] },
            { label: '星座', val: zodiac, set: setZodiac, list: ["山羊座", "水瓶座", "魚座", "牡羊座", "牡牛座", "双子座", "蟹座", "獅子座", "乙女座", "天秤座", "蠍座", "射手座"] },
            { label: '干支', val: eto, set: setEto, list: ["子（ね）", "丑（うし）", "寅（とら）", "卯（う）", "辰（たつ）", "巳（み）", "午（うま）", "未（ひつじ）", "申（さる）", "酉（とり）", "戌（いぬ）", "亥（い）"] }
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12px', color: '#888' }}>{item.label}</label>
              <select value={item.val} onChange={(e)=>item.set(e.target.value)} style={selectStyle}>
                {item.list.map(opt => <option key={opt} value={opt} style={{color: '#000'}}>{opt}</option>)}
              </select>
            </div>
          ))}

          {/* 占う日スイッチ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '12px', color: '#888' }}>占う日</label>
            <div style={{ display: 'flex', backgroundColor: '#1c1c1e', borderRadius: '12px', border: '1px solid #333', padding: '4px' }}>
              <button onClick={() => setTargetDay("今日")} style={{ flex: 1, padding: '12px', border: 'none', borderRadius: '8px', backgroundColor: targetDay === "今日" ? '#3e4491' : 'transparent', color: '#fff', fontWeight: 'bold' }}>今日</button>
              <button onClick={() => setTargetDay("明日")} style={{ flex: 1, padding: '12px', border: 'none', borderRadius: '8px', backgroundColor: targetDay === "明日" ? '#3e4491' : 'transparent', color: '#fff', fontWeight: 'bold' }}>明日</button>
            </div>
          </div>

          <p style={{ textAlign: 'center', color: '#00f2ff', fontSize: '12px', fontWeight: 'bold', marginTop: '10px' }}>本日の残り利用回数：5回</p>

          <button style={{ backgroundColor: '#343a40', color: '#ccc', padding: '14px', borderRadius: '12px', border: '1px solid #444', fontWeight: 'bold', fontSize: '14px' }}>入力を固定する</button>

          <button onClick={tellFortune} disabled={loading} style={{ background: 'linear-gradient(to right, #ff4eb0, #9d50bb, #00d2ff)', color: '#fff', padding: '18px', borderRadius: '15px', border: 'none', fontWeight: 'bold', fontSize: '17px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(157, 80, 187, 0.4)' }}>
            {loading ? "鑑定中..." : "運勢を占う"}
          </button>
        </div>
      </div>

      {result && (
        <div style={{ width: '100%', maxWidth: '400px', marginTop: '25px', backgroundColor: '#161618', padding: '25px', borderRadius: '24px', border: '1px solid rgba(157, 80, 187, 0.4)' }}>
          <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#eee' }}>{result}</p>
        </div>
      )}
    </div>
  );
}
