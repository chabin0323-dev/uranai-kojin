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
    } catch (err) { alert("通信エラー"); } finally { setLoading(false); }
  };

  return (
    <main style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", padding: "20px", textAlign: "center" }}>
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "38px", color: "#8be9fd", margin: "40px 0" }}>AI Fortune Teller</h1>
        <div style={{ backgroundColor: "#0f172a", padding: "30px", borderRadius: "20px", border: "1px solid #1e293b" }}>
          <h2 style={{ color: "#f9a8d4", fontSize: "18px", marginBottom: "25px" }}>情報を入力して下さい</h2>
          <input 
            type="text" placeholder="お名前" value={name} onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "12px", backgroundColor: "#020617", border: "1px solid #334155", borderRadius: "8px", color: "#fff", marginBottom: "20px" }} 
          />
          <p style={{ color: "#2dd4bf", fontSize: "14px", marginBottom: "20px" }}>本日の残り利用回数：5回</p>
          <button 
            onClick={handleFortune} disabled={loading}
            style={{ width: "100%", padding: "16px", borderRadius: "12px", border: "none", fontSize: "18px", fontWeight: "bold", background: "linear-gradient(to right, #d946ef, #ec4899, #06b6d4)", color: "#fff", cursor: "pointer" }}
          >
            {loading ? "鑑定中..." : "運勢を占う"}
          </button>
        </div>
        {result && (
          <div style={{ marginTop: "30px", padding: "20px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "15px", border: "1px solid #333" }}>
            <h3 style={{ color: "#f9a8d4" }}>鑑定結果: {result.overall?.luck}点</h3>
            <p>{result.overall?.text}</p>
          </div>
        )}
      </div>
    </main>
  );
}
