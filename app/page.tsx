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
  const [targetDate, setTargetDate] = useState("今日");
  const [isFixed, setIsFixed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px",
    backgroundColor: isFixed ? "#1a1a1a" : "#080808",
    border: "1px solid #1e293b",
    borderRadius: "8px",
    color: "#fff",
    cursor: isFixed ? "not-allowed" : "pointer",
    position: "relative",
    zIndex: 20, // 重なり順をさらに強化
    WebkitAppearance: "menulist",
  };

  const handleFortune = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/fortune", {
        method: "POST",
        body: JSON.stringify({ name, year, month, day, bloodType, sign, zodiac, targetDate }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) { alert("エラー"); } finally { setLoading(false); }
  };

  return (
    <main style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", padding: "20px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "550px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", fontSize: "36px", color: "#a5f3fc", margin: "30px 0" }}>AI Fortune Teller</h1>
        
        <div style={{ backgroundColor: "#111", padding: "25px", borderRadius: "20px", border: "1px solid #222" }}>
          <h2 style={{ textAlign: "center", color: "#fbcfe8", fontSize: "18px", marginBottom: "30px" }}>占いたい方の情報を入力して下さい</h2>
          
          <div style={{ marginBottom: "15px" }}>
            <label style={{ color: "#ccc", fontSize: "14px", display: "block", marginBottom: "5px" }}>氏名</label>
            <input type="text" disabled={isFixed} value={name} onChange={(e)=>setName(e.target.value)} style={inputStyle} />
          </div>

          {/* 生年月日セクション：ここを重点的に修正 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "15px" }}>
            <div>
              <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "5px" }}>生年月日(年)</label>
              <select disabled={isFixed} value={year} onChange={(e)=>setYear(e.target.value)} style={inputStyle}>
                {/* 1926年から2026年まで手動に近い形で生成 */}
                {Array.from({length: 101}, (_, i) => 2026 - i).map(y => (
                  <option key={y} value={y} style={{backgroundColor: "#111"}}>{y}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "5px" }}>月</label>
              <select disabled={isFixed} value={month} onChange={(e)=>setMonth(e.target.value)} style={inputStyle}>
                {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => (
                  <option key={m} value={m} style={{backgroundColor: "#111"}}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "5px" }}>日</label>
              <select disabled={isFixed} value={day} onChange={(e)=>setDay(e.target.value)} style={inputStyle}>
                {Array.from({length: 31}, (_, i) => i + 1).map(d => (
                  <option key={d} value={d} style={{backgroundColor: "#111"}}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 血液型・星座・干支（これらは機能しているとのことなのでスタイル維持） */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "20px" }}>
            <div><label style={{ fontSize: "12px", color: "#94a3b8" }}>血液型</label>
              <select disabled={isFixed} value={bloodType} onChange={(e)=>setBloodType(e.target.value)} style={inputStyle}>
                {["A", "B", "O", "AB"].map(t => <option key={t} value={t} style={{backgroundColor: "#111"}}>{t}型</option>)}
              </select>
            </div>
            <div><label style={{ fontSize: "12px", color: "#94a3b8" }}>星座</label>
              <select disabled={isFixed} value={sign} onChange={(e)=>setSign(e.target.value)} style={inputStyle}>
                {["牡羊座", "牡牛座", "双子座", "蟹座", "獅子座", "乙女座", "天秤座", "蠍座", "射手座", "山羊座", "水瓶座", "魚座"].map(s => <option key={s} value={s} style={{backgroundColor: "#111"}}>{s}</option>)}
              </select>
            </div>
            <div><label style={{ fontSize: "12px", color: "#94a3b8" }}>干支</label>
              <select disabled={isFixed} value={zodiac} onChange={(e)=>setZodiac(e.target.value)} style={inputStyle}>
                {["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥（い）"].map(z => <option key={z} value={z} style={{backgroundColor: "#111"}}>{z}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <p style={{ color: "#22d3ee", fontSize: "13px" }}>本日の残り利用回数：5回</p>
            <button onClick={() => setIsFixed(!isFixed)} style={{ backgroundColor: "#334155", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>
              {isFixed ? "入力を解除する" : "入力を固定する"}
            </button>
          </div>

          <button onClick={handleFortune} disabled={loading} style={{ width: "100%", padding: "16px", borderRadius: "12px", border: "none", fontSize: "18px", fontWeight: "bold", background: "linear-gradient(to right, #a855f7, #ec4899, #06b6d4)", color: "#fff", cursor: "pointer" }}>
            {loading ? "鑑定中..." : "運勢を占う"}
          </button>
        </div>
      </div>
    </main>
  );
}
