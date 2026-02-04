"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFortune = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/fortune", {
        method: "POST",
        body: JSON.stringify({ name, dob: "1995-10-07", bloodType: "B" }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert("通信エラー");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", padding: "20px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        
        {/* 右上のボタン */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
          <button style={{ backgroundColor: "#1e293b", color: "#fff", border: "1px solid #334155", padding: "5px 15px", borderRadius: "8px", fontSize: "12px" }}>
            📖 取扱説明書
          </button>
        </div>
        
        {/* タイトル */}
        <h1 style={{ textAlign: "center", fontSize: "32px", color: "#8be9fd", margin: "40px 0" }}>
          AI Fortune Teller
        </h1>
        
        {/* メイン入力エリア */}
        <div style={{ backgroundColor: "#0f172a", padding: "30px", borderRadius: "20px", border: "1px solid #1e293b" }}>
          <h2 style={{ textAlign: "center", color: "#f9a8d4", fontSize: "18px", marginBottom: "30px" }}>
            占いたい方の情報を入力して下さい
          </h2>
          
          <div style={{ marginBottom: "20px" }}>
            <label style={{ color: "#94a3b8", fontSize: "14px" }}>氏名</label>
            <input 
              type="text" 
              placeholder="セキュリティ保護のため入力不可"
              value={name} 
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", padding: "12px", backgroundColor: "#020617", border: "1px solid #334155", borderRadius: "8px", color: "#fff", marginTop: "5px" }} 
            />
          </div>

          {/* 生年月日などの枠（デザイン再現） */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "25px" }}>
            <div><label style={{ fontSize: "12px", color: "#94a3b8" }}>生年月日</label><select style={{ width: "100%", padding: "10px", backgroundColor: "#020617", color: "#fff", border: "1px solid #334155", borderRadius: "8px" }}><option>1995</option></select></div>
            <div><label style={{ fontSize: "12px", color: "#94a3b8" }}>月</label><select style={{ width: "100%", padding: "10px", backgroundColor: "#020617", color: "#fff", border: "1px solid #334155", borderRadius: "8px" }}><option>10</option></select></div>
            <div><label style={{ fontSize: "12px", color: "#94a3b8" }}>日</label><select style={{ width: "100%", padding: "10px", backgroundColor: "#020617", color: "#fff", border: "1px solid #334155", borderRadius: "8px" }}><option>7</option></select></div>
          </div>

          <p style={{ color: "#2dd4bf", fontSize: "13px", marginBottom: "20px" }}>本日の残り利用回数：5回</p>

          <button 
            onClick={handleFortune}
            disabled={loading}
            style={{ 
              width: "100%", padding: "16px", borderRadius: "12px", border: "none", fontSize: "18px", fontWeight: "bold",
              background: "linear-gradient(to right, #d946ef, #ec4899, #06b6d4)", color: "#fff", cursor: "pointer"
            }}
          >
            {loading ? "鑑定中..." : "運勢を占う"}
          </button>
        </div>

        {/* 結果エリア */}
        {result && (
          <div style={{ marginTop: "30px", padding: "20px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "15px", border: "1px solid #333" }}>
            <h3 style={{ textAlign: "center", color: "#f9a8d4" }}>鑑定結果</h3>
            <p style={{ lineHeight: "1.6" }}>{result.overall?.text}</p>
          </div>
        )}
      </div>
    </main>
  );
}
