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
  const [isFixed, setIsFixed] = useState(false); // 入力固定の状態管理
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

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
        {/* 右上のボタン */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button style={{ background: "#222", color: "#fff", border: "1px solid #444", padding: "8px 15px", borderRadius: "10px", fontSize: "12px" }}>📖 取扱説明書</button>
        </div>
        <h1 style={{ textAlign: "center", fontSize: "36px", color: "#a5f3fc", margin: "30px 0" }}>AI Fortune Teller</h1>
        
        <div style={{ backgroundColor: "#111", padding: "25px", borderRadius: "20px", border: "1px solid #222" }}>
          <h2 style={{ textAlign: "center", color: "#fbcfe8", fontSize: "18px", marginBottom: "20px" }}>占いたい方の情報を入力して下さい</h2>
          
          {/* 名前入力 */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ color: "#ccc", fontSize: "14px" }}>氏名</label>
            <input 
              type="text" 
              disabled={isFixed}
              value={name} 
              onChange={(e)=>setName(e.target.value)} 
              style={{ width: "100%", padding: "12px", backgroundColor: isFixed ? "#1a1a1a" : "#080808", border: "1px solid #1e293b", borderRadius: "8px", color: "#fff" }} 
            />
          </div>

          {/* 生年月日 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "15px" }}>
            <div><label style={{ fontSize: "12px", color: "#94a3b8" }}>生年月日(年)</label>
              <select disabled={isFixed} value={year} onChange={(e)=>setYear(e.target.value)} style={{ width: "100%", padding: "10px", backgroundColor: "#080808", color: "#fff", border: "1px solid #1e293b", borderRadius: "8px" }}>
                {[...Array(100)].map((_, i) => <option key={i} value={2026-i}>{2026-i}</option>)}
              </select>
            </div>
            <div><label style={{ fontSize: "12px", color: "#94a3b8" }}>月</label>
              <select disabled={isFixed} value={month} onChange={(e)=>setMonth(e.target.value)} style={{ width: "100%", padding: "10px", backgroundColor: "#080808", color: "#fff", border: "1px solid #1e293b", borderRadius: "8px" }}>
                {[...Array(12)].map((_, i) => <option key={i} value={i+1}>{i+1}</option>)}
              </select>
            </div>
            <div><label style={{ fontSize: "12px", color: "#94a3b8" }}>日</label>
              <select disabled={isFixed} value={day} onChange={(e)=>setDay(e.target.value)} style={{ width: "100%", padding: "10px", backgroundColor: "#080808", color: "#fff", border: "1px solid #1e293b", borderRadius: "8px" }}>
                {[...Array(31)].map((_, i) => <option key={i} value={i+1}>{i+1}</option>)}
              </select>
            </div>
          </div>

          {/* 血液型・星座・干支 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "20px" }}>
            <div><label style={{ fontSize: "12px", color: "#94a3b8" }}>血液型</label>
              <select disabled={isFixed} value={bloodType} onChange={(e)=>setBloodType(e.target.value)} style={{ width: "100%", padding: "10px", backgroundColor: "#080808", color: "#fff", border: "1px solid #1e293b", borderRadius: "8px" }}>
                {["A", "B", "O", "AB"].map(t => <option key={t} value={t}>{t}型</option>)}
              </select>
            </div>
            <div><label style={{ fontSize: "12px", color: "#94a3b8" }}>星座</label>
              <select disabled={isFixed} value={sign} onChange={(e)=>setSign(e.target.value)} style={{ width: "100%", padding: "10px", backgroundColor: "#080808", color: "#fff", border: "1px solid #1e293b", borderRadius: "8px" }}>
                {["牡羊座", "牡牛座", "双子座", "蟹座", "獅子座", "乙女座", "天秤座", "蠍座", "射手座", "山羊座", "水瓶座", "魚座"].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div><label style={{ fontSize: "12px", color: "#94a3b8" }}>干支</label>
              <select disabled={isFixed} value={zodiac} onChange={(e)=>setZodiac(e.target.value)} style={{ width: "100%", padding: "10px", backgroundColor: "#080808", color: "#fff", border: "1px solid #1e293b", borderRadius: "8px" }}>
                {["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥（い）"].map(z => <option key={z} value={z}>{z}</option>)}
              </select>
            </div>
          </div>

          {/* 占う日選択 */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ color: "#ccc", fontSize: "14px", display: "block", marginBottom: "8px" }}>占う日</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={()=>setTargetDate("今日")} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", backgroundColor: targetDate === "今日" ? "#4f46e5" : "#1e293b", color: "#fff", cursor: "pointer" }}>今日</button>
              <button onClick={()=>setTargetDate("明日")} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", backgroundColor: targetDate === "明日" ? "#4f46e5" : "#1e293b", color: "#fff", cursor: "pointer" }}>明日</button>
            </div>
          </div>

          {/* 利用回数と入力を固定するボタン */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <p style={{ color: "#22d3ee", fontSize: "13px", margin: 0 }}>本日の残り利用回数：5回</p>
            <button 
              onClick={() => setIsFixed(!isFixed)}
              style={{ backgroundColor: "#334155", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}
            >
              {isFixed ? "入力を解除する" : "入力を固定する"}
            </button>
          </div>

          {/* 鑑定ボタン */}
          <button onClick={handleFortune} disabled={loading} style={{ width: "100%", padding: "16px", borderRadius: "12px", border: "none", fontSize: "18px", fontWeight: "bold", background: "linear-gradient(to right, #a855f7, #ec4899, #06b6d4)", color: "#fff", cursor: "pointer", boxShadow: "0 4px 15px rgba(0,0,0,0.3)" }}>
            {loading ? "鑑定中..." : "運勢を占う"}
          </button>
        </div>

        {/* 結果表示（以前のスタイリッシュな形式） */}
        {result && (
          <div style={{ marginTop: "20px", padding: "20px", backgroundColor: "#111", borderRadius: "15px", border: "1px solid #333" }}>
            <h3 style={{ textAlign: "center", color: "#fbcfe8" }}>{targetDate}の鑑定結果</h3>
            <p style={{ textAlign: "center", fontSize: "24px", color: "#8be9fd", fontWeight: "bold" }}>{result.overall.luck}点</p>
            <p style={{ lineHeight: "1.6", margin: "15px 0", color: "#eee" }}>{result.overall.text}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "13px" }}>
              <div style={{ backgroundColor: "#222", padding: "12px", borderRadius: "8px" }}>💰 金運: {result.money.luck}/5</div>
              <div style={{ backgroundColor: "#222", padding: "12px", borderRadius: "8px" }}>💪 健康: {result.health.luck}/5</div>
              <div style={{ backgroundColor: "#222", padding: "12px", borderRadius: "8px" }}>🎁 アイテム: {result.luckyItem}</div>
              <div style={{ backgroundColor: "#222", padding: "12px", borderRadius: "8px" }}>🔢 ナンバー: {result.luckyNumber}</div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
