"use client";

import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Home() {
  const [name, setName] = useState("");
  const [bloodType, setBloodType] = useState("A型");
  const [zodiac, setZodiac] = useState("牡羊座");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const tellFortune = async () => {
    if (!name) return alert("お名前を入力してください");
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY || "");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `${name}さんは${bloodType}で${zodiac}です。今日の運勢を100文字程度で占ってください。`;
      const res = await model.generateContent(prompt);
      setResult(res.response.text());
    } catch (e) {
      setResult("エラーが発生しました。");
    }
    setLoading(false);
  };

  return (
    <main style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', padding: '2rem', textAlign: 'center' }}>
      <h1>AI Fortune Teller</h1>
      <div style={{ background: '#111', padding: '1.5rem', borderRadius: '10px', border: '1px solid purple', maxWidth: '400px', margin: 'auto' }}>
        <input style={{ width: '100%', marginBottom: '1rem', color: 'black' }} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="名前" />
        <select style={{ color: 'black', marginRight: '1rem' }} value={bloodType} onChange={(e) => setBloodType(e.target.value)}>
          {["A型", "B型", "O型", "AB型"].map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select style={{ color: 'black' }} value={zodiac} onChange={(e) => setZodiac(e.target.value)}>
          {["牡羊座", "牡牛座", "双子座", "蟹座", "獅子座", "乙女座", "天秤座", "蠍座", "射手座", "山羊座", "水瓶座", "魚座"].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button style={{ width: '100%', marginTop: '1rem', padding: '0.5rem', backgroundColor: 'purple', color: 'white' }} onClick={tellFortune} disabled={loading}>
          {loading ? "鑑定中..." : "鑑定開始"}
        </button>
        {result && <div style={{ marginTop: '1rem', borderTop: '1px solid purple', paddingTop: '1rem' }}>{result}</div>}
      </div>
    </main>
  );
}
