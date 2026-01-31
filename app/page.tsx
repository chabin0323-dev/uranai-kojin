"use client";

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Home() {
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("1996");
  const [birthMonth, setBirthMonth] = useState("1");
  const [birthDay, setBirthDay] = useState("1");
  const [bloodType, setBloodType] = useState("A");
  const [zodiac, setZodiac] = useState("山羊座");
  const [eto, setEto] = useState("子（ね）");
  const [targetDay, setTargetDay] = useState("今日");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const tellFortune = async () => {
    setLoading(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey || "");
      const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

      const prompt = `
        名前：${name || "未入力"}
        生年月日：${birthYear}年${birthMonth}月${birthDay}日
        血液型：${bloodType}
        星座：${zodiac}
        干支：${eto}
        占う日：${targetDay}の運勢
        上記の情報から、本格的な占い結果を200文字程度で、具体的かつ神秘的に出力してください。
      `;

      const result = await model.generateContent(prompt);
      setResult(result.response.text());
    } catch (error: any) {
      setResult("鑑定に失敗しました。時間をおいて再度お試しください。");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white p-4 font-sans flex flex-col items-center">
      {/* ヘッダー */}
      <div className="w-full flex justify-end p-2">
        <button className="bg-gray-800 text-[10px] px-3 py-1 rounded border border-gray-600 flex items-center gap-1">
          <span>📖</span> 取扱説明書
        </button>
      </div>

      <h1 className="text-4xl font-black mt-4 mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-blue-400 to-cyan-300 tracking-tighter">
        AI Fortune Teller
      </h1>

      <div className="w-full max-w-md bg-[#121214] rounded-2xl p-8 border border-gray-800 shadow-2xl">
        <p className="text-center text-pink-200 text-sm font-medium mb-6">占いたい方の情報を入力して下さい</p>

        <div className="space-y-5">
          {/* 氏名 */}
          <div>
            <label className="text-xs text-gray-400 block mb-1">氏名</label>
            <input
              type="text"
              placeholder="セキュリティ保護のため入力不可"
              className="w-full bg-[#1a1a1c] border border-gray-800 rounded-md p-3 text-sm focus:outline-none"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* 生年月日 */}
          <label className="text-xs text-gray-400 block -mb-4">生年月日</label>
          <div className="grid grid-cols-3 gap-2">
            <div className="relative">
              <span className="absolute top-[-15px] left-0 text-[10px] text-gray-500">年</span>
              <select className="w-full bg-[#1a1a1c] border border-gray-800 rounded p-2 text-sm" onChange={(e)=>setBirthYear(e.target.value)}>
                <option>1996</option><option>2000</option>
              </select>
            </div>
            <div className="relative">
              <span className="absolute top-[-15px] left-0 text-[10px] text-gray-500">月</span>
              <select className="w-full bg-[#1a1a1c] border border-gray-800 rounded p-2 text-sm" onChange={(e)=>setBirthMonth(e.target.value)}>
                <option>1</option><option>2</option>
              </select>
            </div>
            <div className="relative">
              <span className="absolute top-[-15px] left-0 text-[10px] text-gray-500">日</span>
              <select className="w-full bg-[#1a1a1c] border border-gray-800 rounded p-2 text-sm" onChange={(e)=>setBirthDay(e.target.value)}>
                <option>1</option><option>2</option>
              </select>
            </div>
          </div>

          {/* 血液型 */}
          <div>
            <label className="text-xs text-gray-400 block mb-1">血液型</label>
            <select className="w-full bg-[#1a1a1c] border border-gray-800 rounded p-2 text-sm" onChange={(e)=>setBloodType(e.target.value)}>
              <option>A</option><option>B</option><option>O</option><option>AB</option>
            </select>
          </div>

          {/* 星座 */}
          <div>
            <label className="text-xs text-gray-400 block mb-1">星座</label>
            <select className="w-full bg-[#1a1a1c] border border-gray-800 rounded p-2 text-sm" onChange={(e)=>setZodiac(e.target.value)}>
              <option>山羊座</option><option>水瓶座</option>
            </select>
          </div>

          {/* 干支 */}
          <div>
            <label className="text-xs text-gray-400 block mb-1">干支</label>
            <select className="w-full bg-[#1a1a1c] border border-gray-800 rounded p-2 text-sm" onChange={(e)=>setEto(e.target.value)}>
              <option>子（ね）</option><option>丑（うし）</option>
            </select>
          </div>

          {/* 占う日 */}
          <div>
            <label className="text-xs text-gray-400 block mb-1">占う日</label>
            <div className="grid grid-cols-2 gap-0 border border-gray-800 rounded overflow-hidden">
              <button onClick={()=>setTargetDay("今日")} className={`p-2 text-sm ${targetDay==="今日"?"bg-[#3e4491]":"bg-transparent"}`}>今日</button>
              <button onClick={()=>setTargetDay("明日")} className={`p-2 text-sm ${targetDay==="明日"?"bg-[#3e4491]":"bg-transparent"}`}>明日</button>
            </div>
          </div>

          <p className="text-[10px] text-cyan-400 text-center font-bold">本日の残り利用回数：5回</p>

          <button className="w-full bg-[#343a40] text-gray-300 py-2 rounded-md text-sm font-bold border border-gray-700">
            入力を固定する
          </button>

          <button
            onClick={tellFortune}
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 py-3 rounded-lg text-sm font-bold shadow-lg shadow-purple-500/20 active:scale-95 transition-all"
          >
            {loading ? "鑑定中..." : "運勢を占う"}
          </button>
        </div>
      </div>

      {result && (
        <div className="w-full max-w-md mt-6 bg-[#121214] p-6 rounded-2xl border border-purple-500/30 animate-fade-in">
          <p className="text-gray-200 text-sm leading-relaxed">{result}</p>
        </div>
      )}
    </main>
  );
}
