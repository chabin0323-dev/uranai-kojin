"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [year, setYear] = useState("1995");
  const [month, setMonth] = useState("10");
  const [day, setDay] = useState("7");
  const [bloodType, setBloodType] = useState("B");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFortune = async () => {
    setLoading(true);
    try {
      const dob = `${year}-${month}-${day}`;
      const res = await fetch("/api/fortune", {
        method: "POST",
        body: JSON.stringify({ name, dob, bloodType }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert("通信エラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", padding: "20px", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
      <div style={{ maxWidth: "550px", margin: "0 auto" }}>
        {/* 右上のボタン */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
          <button style={{ backgroundColor: "#222", color: "#fff", border: "1px solid #444", padding: "6px 12px", borderRadius: "8px", fontSize: "12px", display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ fontSize: "16px" }}>📖</span> 取扱説明書
          </button>
        </div>
        
        {/* タイトル */}
        <h1 style={{ textAlign: "center", fontSize: "36px", fontWeight: "normal", color: "#a5f3fc", margin: "40px 0", letterSpacing: "1px" }}>
          AI Fortune Teller
        </h1>
        
        {/* メインパネル */}
        <div style={{ backgroundColor: "#111", padding: "30px", borderRadius: "20px", border: "1px solid #222", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
          <h2 style={{ textAlign: "center", color: "#fbcfe8", fontSize: "20px", marginBottom: "30px", fontWeight: "normal" }}>
            占いたい方の情報を入力して下さい
          </h2>
          
          {/* 名前入力 */}
          <div style={{ marginBottom: "25px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#ccc" }}>氏名</label>
            <input 
              type="text" 
              placeholder="お名前を入力"
              value={name} 
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", padding: "12px", backgroundColor: "#080808", border: "1px solid #1e293b", borderRadius: "8px", color: "#fff", outline: "none" }} 
            />
          </div>

          {/* 生年月日 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px", marginBottom: "25px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#ccc" }}>生年月日</label>
              <select value={year} onChange={(e) => setYear(e.target.value)} style={{ width: "100%", padding: "12px", backgroundColor: "#080808", color: "#fff", border: "1px solid #1e293b", borderRadius: "8px" }}>
                <option value="1995">1995</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#ccc" }}>月</label>
              <select value={month} onChange={(e) => setMonth(e.target.value)} style={{ width: "100%", padding: "12px", backgroundColor: "#080808", color: "#fff", border: "1px solid #1e293b", borderRadius: "8px" }}>
                <option value="10">10</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#ccc" }}>日</label>
              <select value={day} onChange={(e) => setDay(e.target.value)} style={{ width: "100%", padding: "12px", backgroundColor: "#080808", color: "#fff", border: "1px solid #1e293b", borderRadius: "8px" }}>
                <option value="7">7</option>
              </select>
            </div>
          </div>

          {/* 血液型・星座・干支 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px", marginBottom: "30px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#ccc" }}>血液型</label>
              <select value={bloodType} onChange={(e) => setBloodType(e.target.value)} style={{ width: "100%", padding: "12px", backgroundColor: "#080808", color: "#fff", border: "1px solid #1e293b", borderRadius: "8px" }}>
                <option value="B">B型</option>
                <option value="A">A型</option>
                <option value="O">O型</option>
                <option value="AB">AB型</option>
              </select>
            </div>
            <div><label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#ccc" }}>星座</label><select style={{ width: "100%", padding: "12px", backgroundColor: "#080808", color: "#fff", border: "1px solid #1e293b", borderRadius: "8px" }}><option>天秤座</option></select></div>
            <div><label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#ccc" }}>干支</label><select style={{ width: "100%", padding: "12px", backgroundColor: "#080808", color: "#fff", border: "1px solid #1e293b", borderRadius: "8px" }}><option>亥（い）</option></select></div>
          </div>

          <p style={{ color: "#22d3ee", fontSize: "14px", marginBottom: "20px" }}>本日の残り利用回数：5回</p>

          {/* 占うボタン */}
          <button 
            onClick={handleFortune}
            disabled={loading}
            style={{ 
              width: "100%", padding: "16px", borderRadius: "12px", border: "none", fontSize: "18px", fontWeight: "bold",
              background: "linear-gradient(to right, #a855f7, #ec4899, #06b6d4)", color: "#fff", cursor: "pointer",
              boxShadow: "0 4px 15px rgba(236, 72, 153, 0.3)"
            }}
          >
            {loading ? "鑑定中..." : "運勢を占う"}
          </button>
        </div>

        {/* 結果表示エリア */}
        {result && (
          <div style={{ marginTop: "30px", padding: "25px", backgroundColor: "#e0f2fe", borderRadius: "15px", color: "#333", border: "1px solid #bae6fd" }}>
            <h3 style={{ textAlign: "center", color: "#0369a1", margin: "0 0 15px 0" }}>鑑定結果: {result.overall.luck} / 5</h3>
            <p style={{ textAlign: "center", fontSize: "18px", lineHeight: "1.6", margin: "0" }}>{result.overall.text}</p>
            <div style={{ borderTop: "1px solid #bae6fd", marginTop: "15px", paddingTop: "15px", display: "flex", justifyContent: "space-around", fontSize: "14px" }}>
              <span>🌟 アイテム: <strong>{result.luckyItem}</strong></span>
              <span>🔢 ナンバー: <strong>{result.luckyNumber}</strong></span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
