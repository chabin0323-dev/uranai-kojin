"use client";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [year, setYear] = useState("1995");
  const [month, setMonth] = useState("10");
  const [day, setDay] = useState("7");
  const [bloodType, setBloodType] = useState("B");
  const [sign, setSign] = useState("天秤座");
  const [zodiac, setZodiac] = useState("亥（い）");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFortune = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/fortune", {
        method: "POST",
        body: JSON.stringify({ name, year, month, day, bloodType, sign, zodiac }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) { alert("エラーが発生しました"); } finally { setLoading(false); }
  };

  return (
    <main style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", padding: "20px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
          <button style={{ backgroundColor: "#222", color: "#fff", border: "1px solid #444", padding: "6px 12px", borderRadius: "8px", fontSize: "12px" }}>📖 取扱説明書</button>
        </div>
        <h1 style={{ textAlign: "center", fontSize: "36px", color: "#a5f3fc", margin: "40px 0", fontWeight: "bold" }}>AI Fortune Teller</h1>
        
        <div style={{ backgroundColor: "#111", padding: "30px", borderRadius: "20px", border: "1px solid #222" }}>
          <h2 style={{ textAlign: "center", color: "#fbcfe8", fontSize: "20px", marginBottom: "30px" }}>占いたい方の情報を入力して下さい</h2>
          
          <div style={{ marginBottom: "20px" }}>
            <label style={{ color: "#ccc", fontSize: "14px" }}>氏名</label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} style={{ width: "100%", padding: "12px", backgroundColor: "#080808", border: "1px solid #1e293b", borderRadius: "8px", color: "#fff" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "20px" }}>
            <div><label style={{ fontSize: "12px", color: "#94a3b8" }}>生年月日(年)</label><select value={year} onChange={(e)=>setYear(e.target.value)} style={{ width: "100%", padding: "10px", backgroundColor: "#080808", color: "#fff", border: "1px solid #1e293b", borderRadius: "8px" }}><option>1995</option></select></div>
            <div><label style={{ fontSize: "12px", color: "#94a3b8" }}>月</label><select value={month} onChange={(e)=>setMonth(e.target.value)} style={{ width: "100%", padding: "10px", backgroundColor: "#080808", color: "#fff", border: "1px solid #1e293b", borderRadius: "8px" }}><option>10</option></select></div>
            <div><label style={{ fontSize: "12px", color: "#94a3b8" }}>日</label><select value={day} onChange={(e)=>setDay(e.target.value)} style={{ width: "100%", padding: "10px", backgroundColor: "#080808", color: "#fff", border: "1px solid #1e293b", borderRadius: "8px" }}><option>7</option></select></div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "25px" }}>
            <div><label style={{ fontSize: "12px", color: "#94a3b8" }}>血液型</label><select value={bloodType} onChange={(e)=>setBloodType(e.target.value)} style={{ width: "100%", padding: "10px", backgroundColor: "#080808", color: "#fff", border: "1px solid #1e293b", borderRadius: "8px" }}><option>B</option><option>A</option><option>O</option><option>AB</option></select></div>
            <div><label style={{ fontSize: "12px", color: "#94a3b8" }}>星座</label><select value={sign} onChange={(e)=>setSign(e.target.value)} style={{ width: "100%", padding: "10px", backgroundColor: "#080808", color: "#fff", border: "1px solid #1e293b", borderRadius: "8px" }}><option>天秤座</option></select></div>
            <div><label style={{ fontSize: "12px", color: "#94a3b8" }}>干支</label><select value={zodiac} onChange={(e)=>setZodiac(e.target.value)} style={{ width: "100%", padding: "10px", backgroundColor: "#080808", color: "#fff", border: "1px solid #1e293b", borderRadius: "8px" }}><option>亥（い）</option></select></div>
          </div>

          <p style={{ color: "#22d3ee", fontSize: "14px", marginBottom: "20px" }}>本日の残り利用回数：5回</p>
          <button onClick={handleFortune} disabled={loading} style={{ width: "100%", padding: "16px", borderRadius: "12px", border: "none", fontSize: "18px", fontWeight: "bold", background: "linear-gradient(to right, #a855f7, #ec4899, #06b6d4)", color: "#fff", cursor: "pointer" }}>
            {loading ? "鑑定中..." : "運勢を占う"}
          </button>
        </div>

        {result && (
          <div style={{ marginTop: "30px", padding: "20px", backgroundColor: "#111", borderRadius: "15px", border: "1px solid #333" }}>
            <h3 style={{ textAlign: "center", color: "#fbcfe8", marginBottom: "20px" }}>鑑定結果: {result.overall.luck}点</h3>
            <p style={{ lineHeight: "1.8", color: "#fff", marginBottom: "20px" }}>{result.overall.text}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "14px" }}>
              <div style={{ backgroundColor: "#222", padding: "10px", borderRadius: "8px" }}>💰 金運: {result.money.luck}/5</div>
              <div style={{ backgroundColor: "#222", padding: "10px", borderRadius: "8px" }}>💪 健康: {result.health.luck}/5</div>
              <div style={{ backgroundColor: "#222", padding: "10px", borderRadius: "8px" }}>🎁 アイテム: {result.luckyItem}</div>
              <div style={{ backgroundColor: "#222", padding: "10px", borderRadius: "8px" }}>🔢 数: {result.luckyNumber}</div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
