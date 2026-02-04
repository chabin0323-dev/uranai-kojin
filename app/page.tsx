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
    <main style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", padding: "20px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        
        {/* 右上の取扱説明書ボタン */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
          <button style={{ backgroundColor: "#1e293b", color: "#fff", border: "1px solid #334155", padding: "5px 15px", borderRadius: "8px", fontSize: "12px", display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ backgroundColor: "#6366f1", borderRadius: "3px", padding: "0 2px" }}>📖</span> 取扱説明書
          </button>
        </div>
        
        {/* タイトルロゴ */}
        <h1 style={{ textAlign: "center", fontSize: "38px", color: "#8be9fd", fontWeight: "bold", margin: "30px 0" }}>
          AI Fortune Teller
        </h1>
        
        {/* メインパネル */}
        <div style={{ backgroundColor: "#0f172a", padding: "30px", borderRadius: "15px", border: "1px solid #1e293b" }}>
          <h2 style={{ textAlign: "center", color: "#f9a8d4", fontSize: "18px", marginBottom: "30px" }}>
            占いたい方の情報を入力して下さい
          </h2>
          
          <div style={{ marginBottom: "20px" }}>
            <label style={{ color: "#94a3b8", fontSize: "14px", display: "block", marginBottom: "8px" }}>氏名</label>
            <input 
              type="text" 
              placeholder="セキュリティ保護のため入力不可"
              value={name} 
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", padding: "12px", backgroundColor: "#020617", border: "1px solid #334155", borderRadius: "8px", color: "#fff" }} 
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                <div><label style={{ color: "#94a3b8", fontSize: "12px" }}>生年月日（年）</label>
                <select value={year} onChange={(e) => setYear(e.target.value)} style={{ width: "100%", padding: "12px", backgroundColor: "#020617", color: "#fff", border: "1px solid #334155", borderRadius: "8px" }}><option value="1995">1995</option></select></div>
                <div><label style={{ color: "#94a3b8", fontSize: "12px" }}>月</label>
                <select value={month} onChange={(e) => setMonth(e.target.value)} style={{ width: "100%", padding: "12px", backgroundColor: "#020617", color: "#fff", border: "1px solid #334155", borderRadius: "8px" }}><option value="10">10</option></select></div>
                <div><label style={{ color: "#94a3b8", fontSize: "12px" }}>日</label>
                <select value={day} onChange={(e) => setDay(e.target.value)} style={{ width: "100%", padding: "12px", backgroundColor: "#020617", color: "#fff", border: "1px solid #334155", borderRadius: "8px" }}><option value="7">7</option></select></div>
             </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "30px" }}>
            <div><label style={{ color: "#94a3b8", fontSize: "12px" }}>血液型</label>
            <select value={bloodType} onChange={(e) => setBloodType(e.target.value)} style={{ width: "100%", padding: "12px", backgroundColor: "#020617", color: "#fff", border: "1px solid #334155", borderRadius: "8px" }}><option value="B">B型</option></select></div>
            <div><label style={{ color: "#94a3b8", fontSize: "12px" }}>星座</label>
            <select style={{ width: "100%", padding: "12px", backgroundColor: "#020617", color: "#fff", border: "1px solid #334155", borderRadius: "8px" }}><option>天秤座</option></select></div>
            <div><label style={{ color: "#94a3b8", fontSize: "12px" }}>干支</label>
            <select style={{ width: "100%", padding: "12px", backgroundColor: "#020617", color: "#fff", border: "1px solid #334155", borderRadius: "8px" }}><option>亥（い）</option></select></div>
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

        {/* 鑑定結果の表示エリア（成功時のみ） */}
        {result && (
          <div style={{ marginTop: "30px", padding: "20px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "15px", border: "1px solid #333" }}>
            <h3 style={{ textAlign: "center", color: "#f9a8d4" }}>鑑定結果</h3>
            <p style={{ textAlign: "center", fontSize: "24px", color: "#8be9fd" }}>{result.overall?.luck}点</p>
            <p style={{ lineHeight: "1.6" }}>{result.overall?.text}</p>
          </div>
        )}
      </div>
    </main>
  );
}
