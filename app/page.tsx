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

  // 占い実行（最新Gemini 3モデル）
  const tellFortune = async () => {
    setLoading(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey || "");
      const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

      const prompt = `占い師として鑑定してください。名前:${name}, 生年月日:${birthYear}/${birthMonth}/${birthDay}, 血液型:${bloodType}, 星座:${zodiac}, 干支:${eto}, ${targetDay}の運勢を200文字で。`;
      const res = await model.generateContent(prompt);
      setResult(res.response.text());
    } catch (e) {
      setResult("エラー。1日5回制限の可能性があります。");
    }
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff', padding: '20px', fontFamily: 'sans-serif', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '380px' }}>
        
        {/* 取扱説明書ボタン */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}>
          <button style={{ backgroundColor: '#2d2d3d', border: '1px solid #444', color: '#fff', borderRadius: '6px', padding: '6px 12px', fontSize: '12px' }}>📖 取扱説明書</button>
        </div>

        {/* メインタイトル */}
        <h1 style={{ textAlign: 'center', fontSize: '36px', fontWeight: '900', marginBottom: '25px', background: 'linear-gradient(to right, #bca1ff, #7eb6ff, #6ffffa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          AI Fortune Teller
        </h1>

        {/* 入力フォーム */}
        <div style={{ backgroundColor: '#161618', borderRadius: '20px', padding: '25px', border: '1px solid #282828', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          <p style={{ textAlign: 'center', color: '#ffd1ff', fontSize: '14px', marginBottom: '25px', fontWeight: 'bold' }}>占いたい方の情報を入力して下さい</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            {/* 氏名入力 */}
            <div>
              <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '5px' }}>氏名</label>
              <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="セキュリティ保護のため入力不可" style={{ width: '100%', backgroundColor: '#1c1c1e', border: '1px solid #333', borderRadius: '8px', padding: '12px', color: '#fff', boxSizing: 'border-box' }} />
            </div>

            {/* 生年月日 */}
            <div>
              <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '5px' }}>生年月日</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                <select value={birthYear} onChange={(e)=>setBirthYear(e.target.value)} style={{ backgroundColor: '#1c1c1e', color: '#fff', padding: '10px', borderRadius: '8px', border: '1px solid #333' }}>
                  {["1990","1996","2000","2020","2026"].map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <select value={birthMonth} onChange={(e)=>setBirthMonth(e.target.value)} style={{ backgroundColor: '#1c1c1e', color: '#fff', padding: '10px', borderRadius: '8px', border: '1px solid #333' }}>
                  {["1","2","3","4","5","6","7","8","9","10","11","12"].map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <select value={birthDay} onChange={(e)=>setBirthDay(e.target.value)} style={{ backgroundColor: '#1c1c1e', color: '#fff', padding: '10px', borderRadius: '8px', border: '1px solid #333' }}>
                  {["1","10","20","31"].map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            {/* 各種プルダウン（必ず選択肢が出るように固定） */}
            {[
              { label: '血液型', val: bloodType, set: setBloodType, list: ["A", "B", "O", "AB"] },
              { label: '星座', val: zodiac, set: setZodiac, list: ["山羊座", "水瓶座", "魚座", "牡羊座", "牡牛座", "双子座", "蟹座", "獅子座", "乙女座", "天秤座", "蠍座", "射手座"] },
              { label: '干支', val: eto, set: setEto, list: ["子（ね）", "丑（うし）", "寅（とら）", "卯（う）", "辰（たつ）", "巳（み）", "午（うま）", "未（ひつじ）", "申（さる）", "酉（とり）", "戌（いぬ）", "亥（い）"] }
            ].map(item => (
              <div key={item.label}>
                <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '5px' }}>{item.label}</label>
                <select value={item.val} onChange={(e)=>item.set(e.target.value)} style={{ width: '100%', backgroundColor: '#1c1c1e', color: '#fff', padding: '10px', borderRadius: '8px', border: '1px solid #333' }}>
                  {item.list.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
            ))}

            {/* 占う日スイッチ */}
            <div>
              <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '5px' }}>占う日</label>
              <div style={{ display: 'flex', backgroundColor: '#1c1c1e', borderRadius: '10px', border: '1px solid #333', padding: '4px' }}>
                <button onClick={() => setTargetDay("今日")} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '6px', backgroundColor: targetDay === "今日" ? '#3e4491' : 'transparent', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>今日</button>
                <button onClick={() => setTargetDay("明日")} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '6px', backgroundColor: targetDay === "明日" ? '#3e4491' : 'transparent', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>明日</button>
              </div>
            </div>

            <p style={{ textAlign: 'center', color: '#00f2ff', fontSize: '12px', fontWeight: 'bold', marginTop: '5px' }}>本日の残り利用回数：5回</p>

            <button style={{ backgroundColor: '#343a40', color: '#ccc', padding: '12px', borderRadius: '10px', border: '1px solid #444', fontWeight: 'bold', fontSize: '14px' }}>入力を固定する</button>

            <button onClick={tellFortune} disabled={loading} style={{ background: 'linear-gradient(to right, #ff4eb0, #9d50bb, #00d2ff)', color: '#fff', padding: '16px', borderRadius: '12px', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
              {loading ? "鑑定中..." : "運勢を占う"}
            </button>
          </div>
        </div>

        {/* 鑑定結果の表示エリア */}
        {result && (
          <div style={{ marginTop: '20px', backgroundColor: '#161618', padding: '20px', borderRadius: '20px', border: '1px solid rgba(157, 80, 187, 0.4)' }}>
            <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#eee' }}>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
