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

  // 全ての選択肢をリスト化
  const years = Array.from({ length: 81 }, (_, i) => (1945 + i).toString());
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
      // Google AI Studioと同じ最新モデル
      const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

      const prompt = `占い師として、以下の情報の人物の${targetDay}の運勢を200文字程度で鑑定してください。
        名前:${name}, 生年月日:${birthYear}/${birthMonth}/${birthDay}, 血液型:${bloodType}, 星座:${zodiac}, 干支:${eto}`;

      const res = await model.generateContent(prompt);
      setResult(res.response.text());
    } catch (e) {
      setResult("エラー。1日5回制限の可能性があります。");
    }
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        
        {/* 取扱説明書 */}
        <div style={{ textAlign: 'right', marginBottom: '10px' }}>
          <button style={{ backgroundColor: '#333', border: '1px solid #555', color: '#fff', padding: '5px 10px', borderRadius: '5px' }}>📖 取扱説明書</button>
        </div>

        {/* タイトル */}
        <h1 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 'bold', background: 'linear-gradient(to right, #bca1ff, #7eb6ff, #6ffffa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '20px' }}>AI Fortune Teller</h1>

        {/* フォーム本体 */}
        <div style={{ backgroundColor: '#111', border: '1px solid #222', borderRadius: '15px', padding: '20px' }}>
          <p style={{ textAlign: 'center', color: '#ffd1ff', fontSize: '14px', marginBottom: '20px' }}>占いたい方の情報を入力して下さい</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {/* 氏名 */}
            <div>
              <label style={{ fontSize: '11px', color: '#888' }}>氏名</label>
              <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="セキュリティ保護のため入力不可" style={{ width: '100%', backgroundColor: '#1a1a1c', border: '1px solid #333', color: '#fff', padding: '10px', borderRadius: '5px', boxSizing: 'border-box' }} />
            </div>

            {/* 生年月日 */}
            <div>
              <label style={{ fontSize: '11px', color: '#888' }}>生年月日</label>
              <div style={{ display: 'flex', gap: '5px' }}>
                <select value={birthYear} onChange={(e)=>setBirthYear(e.target.value)} style={{ flex: 1, backgroundColor: '#1a1a1c', color: '#fff', padding: '8px' }}>{years.map(y=><option key={y} value={y}>{y}</option>)}</select>
                <select value={birthMonth} onChange={(e)=>setBirthMonth(e.target.value)} style={{ flex: 1, backgroundColor: '#1a1a1c', color: '#fff', padding: '8px' }}>{months.map(m=><option key={m} value={m}>{m}</option>)}</select>
                <select value={birthDay} onChange={(e)=>setBirthDay(e.target.value)} style={{ flex: 1, backgroundColor: '#1a1a1c', color: '#fff', padding: '8px' }}>{days.map(d=><option key={d} value={d}>{d}</option>)}</select>
              </div>
            </div>

            {/* その他プルダウン */}
            {[
              {label: '血液型', list: bloodTypes, state: bloodType, setState: setBloodType},
              {label: '星座', list: zodiacs, state: zodiac, setState: setZodiac},
              {label: '干支', list: etos, state: eto, setState: setEto}
            ].map(item => (
              <div key={item.label}>
                <label style={{ fontSize: '11px', color: '#888' }}>{item.label}</label>
                <select value={item.state} onChange={(e)=>item.setState(e.target.value)} style={{ width: '100%', backgroundColor: '#1a1a1c', color: '#fff', padding: '8px' }}>
                  {item.list.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
            ))}

            {/* 占う日スイッチ */}
            <div>
              <label style={{ fontSize: '11px', color: '#888' }}>占う日</label>
              <div style={{ display: 'flex', border: '1px solid #333', borderRadius: '5px', overflow: 'hidden' }}>
                <button onClick={()=>setTargetDay("今日")} style={{ flex: 1, padding: '10px', backgroundColor: targetDay==="今日"?'#3e4491':'transparent', color:'#fff', border:'none' }}>今日</button>
                <button onClick={()=>setTargetDay("明日")} style={{ flex: 1, padding: '10px', backgroundColor: targetDay==="明日"?'#3e4491':'transparent', color:'#fff', border:'none' }}>明日</button>
              </div>
            </div>

            <p style={{ textAlign: 'center', fontSize: '11px', color: '#00f2ff' }}>本日の残り利用回数：5回</p>

            <button style={{ backgroundColor: '#343a40', color: '#ccc', padding: '10px', borderRadius: '5px', border: 'none', fontWeight: 'bold' }}>入力を固定する</button>
            <button onClick={tellFortune} disabled={loading} style={{ background: 'linear-gradient(to right, #ff4eb0, #9d50bb, #00d2ff)', color: '#fff', padding: '15px', borderRadius: '10px', border: 'none', fontWeight: 'bold', fontSize: '16px' }}>{loading ? "鑑定中..." : "運勢を占う"}</button>
          </div>
        </div>

        {/* 鑑定結果 */}
        {result && (
          <div style={{ marginTop: '20px', backgroundColor: '#111', padding: '15px', borderRadius: '10px', border: '1px solid #333' }}>
            <p style={{ fontSize: '14px', lineHeight: '1.6' }}>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
