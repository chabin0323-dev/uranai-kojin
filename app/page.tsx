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
            <span style={{ backgroundColor: "#6366f1", borderRadius: "3px", padding: "0 3px" }}>📖</span> 取扱説明書
          </button>
        </div>
        
        {/* タイトルロゴ */}
        <h1 style={{ textAlign: "center", fontSize: "38px", color: "#8be9fd", fontWeight: "bold", margin: "30px 0", textShadow: "0 0 10px rgba(139, 233, 253, 0.3)" }}>
          AI Fortune Teller
        </h1>
        
        {/* 入力フォームエリア */}
        <div style={{ backgroundColor: "#0f172a", padding: "25px", borderRadius: "15px", border: "1px solid #1e293b" }}>
          <h2 style={{ textAlign: "center", color: "#f9a8d4", fontSize: "18px", marginBottom: "25px" }}>
            占いたい方の情報を入力して下さい
          </h2>
          
          {/* 氏名 */}
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

          {/* 生年月日一行目 */}
          <div style={{ marginBottom: "20px" }}>
             <label style={{ color: "#94a3b8", fontSize: "14px", display: "block", marginBottom: "8px" }}>生年月日</label>
             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                <select value={year} onChange={(e) => setYear(e.target.value)} style={{ padding: "12px", backgroundColor: "#020617", color: "#fff", border: "1px solid #334155", borderRadius: "8px" }}><option value="1995">1995</option></select>
                <select value={month} onChange={(e) => setMonth(e.target.value)} style={{ padding: "12px", backgroundColor: "#020617", color: "#fff", border: "1px solid #334155", borderRadius: "8px" }}><option value="10">10</option></select>
                <select value={day} onChange={(e) => setDay(e.target.value)} style={{ padding: "12px", backgroundColor: "#020617", color: "#fff", border: "1px solid #334155", borderRadius: "8px" }}><option value="7">7</option></select>
             </div>
          </div>

          {/* 下段（血液型・星座・干支） */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "25px" }}>
            <div>
              <label style={{ color: "#94a3b8", fontSize: "12px", display: "block", marginBottom: "5px" }}>血液型</label>
              <select value={bloodType} onChange={(e) => setBloodType(e.target.value)} style={{ width: "100%", padding: "12px", backgroundColor: "#020617", color: "#fff", border: "1px solid #334155", borderRadius: "8px" }}><option value="B">B型</option></select>
            </div>
            <div>
              <label style={{ color: "#94a3b8", fontSize: "12px", display: "block", marginBottom: "5px" }}>星座</label>
              <select style={{ width: "100%", padding: "12px", backgroundColor: "#020617", color: "#fff", border: "1px solid #334155", borderRadius: "8px" }}><option>天秤座</option></select>
            </div>
            <div>
              <label style={{ color: "#94a3b8", fontSize: "12px", display: "block", marginBottom: "5px" }}>干支</label>
              <select style={{ width: "100%", padding: "12px", backgroundColor: "#020617", color: "#fff", border: "1px solid #334155", borderRadius: "8px" }}><option>亥（い）</option></select>
            </div>
          </div>

          <p style={{ color: "#2dd4bf", fontSize: "13px", marginBottom: "20px" }}>本日の残り利用回数：5回</p>

          {/* 占うボタン（グラデーション） */}
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

        {/* 鑑定結果表示 */}
        {result && (
          <div style={{ marginTop: "30px", padding: "20px", backgroundColor: "#fff", borderRadius: "15px", color: "#111" }}>
            <h3 style={{ textAlign: "center", color: "#ec4899", margin: "0 0 10px 0" }}>鑑定結果</h3>
            <p style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>{result.overall.luck}点 / 5点</p>
            <p style={{ lineHeight: "1.6" }}>{result.overall.text}</p>
          </div>
        )}
      </div>
    </main>
  );
}
