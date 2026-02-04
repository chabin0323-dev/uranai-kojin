"use client";
import { useState } from "react";
import { getFortune } from "./geminiService";

export default function Home() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [bloodType, setBloodType] = useState("A");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFortune = async () => {
    setLoading(true);
    try {
      const data = await getFortune(name, dob, bloodType);
      setResult(data);
    } catch (err) {
      alert("通信エラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>個人占い</h1>
      <input type="text" placeholder="名前" onChange={(e) => setName(e.target.value)} />
      <input type="date" onChange={(e) => setDob(e.target.value)} />
      <button onClick={handleFortune} disabled={loading}>
        {loading ? "鑑定中..." : "占う"}
      </button>
      {result && (
        <div>
          <h2>{result.score}点</h2>
          <p>{result.advice}</p>
        </div>
      )}
    </div>
  );
}
