"use client";
import { useState } from "react";
import { getFortune } from "./geminiService";

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
    try {
      const data = await getFortune(name, dob, bloodType);
      setResult(data);
    } catch (err) {
      setError("通信エラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: "20px", maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      <h1>個人占い（復活版）</h1>
      <input type="text" placeholder="名前" onChange={(e) => setName(e.target.value)} style={{ display: "block", marginBottom: "10px", width: "100%" }} />
      <input type="date" onChange={(e) => setDob(e.target.value)} style={{ display: "block", marginBottom: "10px", width: "100%" }} />
      <button onClick={handleFortune} disabled={loading} style={{ width: "100%", padding: "10px", background: "#0070f3", color: "white" }}>
        {loading ? "鑑定中..." : "占う"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
          <h2>{result.score}点</h2>
          <p><strong>{result.summary}</strong></p>
          <p>{result.advice}</p>
        </div>
      )}
    </main>
  );
}
