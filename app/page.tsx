"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [bloodType, setBloodType] = useState("A");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFortune = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      // さきほど作成した api/fortune/route.ts にデータを送ります
      const res = await fetch("/api/fortune", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, dob, bloodType }),
      });

      if (!res.ok) {
        throw new Error("通信に失敗しました。");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("通信エラーが発生しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: "40px 20px", maxWidth: "500px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>個人占い</h1>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="お名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <select
          value={bloodType}
          onChange={(e) => setBloodType(e.target.value)}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        >
          <option value="A">A型</option>
          <option value="B">B型</option>
          <option value="O">O型</option>
          <option value="AB">AB型</option>
        </select>
        
        <button
          onClick={handleFortune}
          disabled={loading || !name || !dob}
          style={{
            padding: "12px",
            backgroundColor: loading ? "#ccc" : "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          {loading ? "鑑定中..." : "占う"}
        </button>
      </div>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {result && (
        <div style={{ marginTop: "30px", padding: "20px", border: "2px solid #0070f3", borderRadius: "10px", backgroundColor: "#f0f7ff" }}>
          <h2 style={{ textAlign: "center", marginTop: "0" }}>鑑定結果: {result.score}点</h2>
          <p style={{ fontSize: "18px", lineHeight: "1.6" }}>{result.advice}</p>
        </div>
      )}
    </main>
  );
}
