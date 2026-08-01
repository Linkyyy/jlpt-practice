"use client";

import Link from "next/link";
import { useState } from "react";

export default function ListeningPage() {
  const [playing, setPlaying] = useState(false);
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between"><Link href="/practice/setup" className="text-sm font-semibold text-indigo-700">← 重新选择</Link><span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-bold text-indigo-700">N2 · 听力</span></div>
        <header className="mt-7"><p className="text-sm font-bold text-indigo-600">原创模拟题 · 听力理解</p><h1 className="mt-2 text-3xl font-bold">听力播放器</h1><p className="mt-2 text-slate-600">播放音频后，选择最符合对话内容的一项。</p></header>
        <section className="mt-7 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-slate-900 p-6 text-white sm:p-8">
            <div className="flex items-center gap-5">
              <button type="button" onClick={() => setPlaying(!playing)} aria-label={playing ? "暂停" : "播放"} className="flex size-14 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-xl hover:bg-indigo-400">{playing ? "Ⅱ" : "▶"}</button>
              <div className="min-w-0 flex-1"><div className="flex justify-between text-sm"><span className="font-semibold">会话 01</span><span className="text-slate-400">00:00 / 00:42</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-700"><div className={`h-full rounded-full bg-indigo-400 ${playing ? "w-2/5" : "w-0"} transition-all duration-1000`} /></div></div>
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-slate-700 pt-4 text-sm text-slate-400"><button type="button" className="hover:text-white">↺ 重新播放</button><span>音量　▂▄▆</span><span>播放速度 1.0×</span></div>
          </div>
          <div className="p-5 sm:p-8">
            <p className="text-sm font-bold text-indigo-600">问题 1</p><h2 className="mt-2 text-lg font-bold">女の人は、このあと何をしますか。</h2>
            <fieldset className="mt-5 grid gap-3 sm:grid-cols-2"><legend className="sr-only">答案选项</legend>{["資料を印刷する", "会議室を予約する", "男の人に電話する", "予定表を確認する"].map((option, index) => <label key={option} className="flex cursor-pointer gap-3 rounded-xl border border-slate-200 p-4 hover:border-indigo-300 hover:bg-indigo-50"><input type="radio" name="listening-answer" className="accent-indigo-600"/><span lang="ja">{index + 1}. {option}</span></label>)}</fieldset>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">静态原型说明：播放器用于展示播放、进度、音量和速度控件的页面状态，不加载外部音频。</p>
            <button type="button" className="mt-6 w-full rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white sm:w-auto">提交答案</button>
          </div>
        </section>
      </div>
    </main>
  );
}
