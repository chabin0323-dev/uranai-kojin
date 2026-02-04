"use client";
import { useState } from "react";
import { getFortune } from "./services/geminiService";

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
      // 先ほど作った geminiService を呼び出します
      const data = await getFortune(name, dob, bloodType);
      setResult(data);
    } catch (err) {
      setError("通信エラーが発生しました。APIキーや制限を確認してください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h1>個人占い</h1>
      <input type="text" placeholder="名前" onChange={(e) => setName(e.target.value)} style={{ display: "block", marginBottom: "10px", width: "100%" }} />
      <input type="date" onChange={(e) => setDob(e.target.value)} style={{ display: "block", marginBottom: "10px", width: "100%" }} />
      <select onChange={(e) => setBloodType(e.target.value)} style={{ display: "block", marginBottom: "10px", width: "100%" }}>
        <option value="A">A型</option><option value="B">B型</option><option value="O">O型</option><option value="AB">AB型</option>
      </select>
      <button onClick={handleFortune} disabled={loading} style={{ width: "100%", padding: "10px", background: "#0070f3", color: "white", border: "none", borderRadius: "5px" }}>
        {loading ? "鑑定中..." : "占う"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && (
        <div style={{ marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "20px" }}>
          <h2>鑑定結果: {result.score}点</h2>
          <p><strong>要約:</strong> {result.summary}</p>
          <p>{result.advice}</p>
        </div>
      )}
    </main>
  );
}
