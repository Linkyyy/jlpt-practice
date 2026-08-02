"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const levels = ["N1", "N2", "N3", "N4", "N5"];
const years = ["2026", "2025", "2024"];
const types = [
  { id: "文字・词汇", description: "汉字读音、词义与用法" },
  { id: "语法", description: "句型、助词与句子结构" },
  { id: "阅读", description: "文章理解与多道子题" },
  { id: "听力", description: "对话、要点与即时应答" },
];

export function PracticeSetup() {
  const params = useSearchParams();
  const initialLevel = params.get("level");
  const initialType = params.get("type");
  const [level, setLevel] = useState(levels.includes(initialLevel ?? "") ? initialLevel! : "N2");
  const [year, setYear] = useState("2026");
  const [type, setType] = useState(types.some((item) => item.id === initialType) ? initialType! : "语法");
  const [mode, setMode] = useState<"full" | "single">("full");
  const target = mode === "full" ? "/practice" : type === "阅读" ? "/practice/reading" : type === "听力" ? "/practice/listening" : "/practice";
  const query = `?level=${level}&year=${year}&type=${encodeURIComponent(type)}&mode=${mode}`;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm font-semibold text-indigo-700">← 返回首页</Link>
        <p className="mt-8 text-sm font-bold tracking-widest text-indigo-600">PRACTICE SETUP</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">选择本次练习内容</h1>
        <p className="mt-3 text-slate-600">等级、年份和题型会一起应用到本次原创模拟练习。</p>

        <div className="mt-8 space-y-7 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <ChoiceGroup title="1. 选择等级" values={levels} selected={level} onSelect={setLevel} />
          <ChoiceGroup title="2. 选择年份" values={years} selected={year} onSelect={setYear} suffix=" 年度模拟" />

          <fieldset>
            <legend className="text-lg font-bold">3. 选择练习方式</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <ModeButton active={mode === "full"} title="整份卷子" detail="按顺序完成全部题型" onClick={() => setMode("full")} />
              <ModeButton active={mode === "single"} title="专项练习" detail={`集中练习一个题型`} onClick={() => setMode("single")} />
            </div>
          </fieldset>

          {mode === "single" && (
            <fieldset>
              <legend className="text-lg font-bold">4. 选择题型</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {types.map((item) => (
                  <button key={item.id} type="button" onClick={() => setType(item.id)} className={`rounded-xl border p-4 text-left transition ${type === item.id ? "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600" : "border-slate-200 hover:border-indigo-300"}`}>
                    <span className="font-bold">{item.id}</span><span className="mt-1 block text-sm text-slate-500">{item.description}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-600"><strong className="text-slate-900">当前选择：</strong>{year} · {level} · {mode === "full" ? "整份卷子" : type}</p>
            <Link href={`${target}${query}`} className="rounded-xl bg-indigo-600 px-7 py-3 text-center font-semibold text-white hover:bg-indigo-700">开始练习</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function ChoiceGroup({ title, values, selected, onSelect, suffix = "" }: { title: string; values: string[]; selected: string; onSelect: (value: string) => void; suffix?: string }) {
  return <fieldset><legend className="text-lg font-bold">{title}</legend><div className="mt-3 flex flex-wrap gap-2">{values.map((value) => <button key={value} type="button" onClick={() => onSelect(value)} className={`rounded-xl border px-5 py-3 font-bold ${selected === value ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-200 bg-white hover:border-indigo-300"}`}>{value}{suffix}</button>)}</div></fieldset>;
}

function ModeButton({ active, title, detail, onClick }: { active: boolean; title: string; detail: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className={`rounded-xl border p-4 text-left ${active ? "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600" : "border-slate-200"}`}><span className="font-bold">{title}</span><span className="mt-1 block text-sm text-slate-500">{detail}</span></button>;
}
