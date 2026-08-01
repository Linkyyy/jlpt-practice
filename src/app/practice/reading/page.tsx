"use client";

import Link from "next/link";
import { useState } from "react";

const questions = [
  { prompt: "作者开始记录「できたこと」的原因是什么？", options: ["为了提高工作速度", "为了注意到每天微小的进步", "为了向朋友介绍生活", "为了制定更严格的计划"] },
  { prompt: "持续记录之后发生了什么变化？", options: ["每天的任务变少了", "不再需要学习", "更容易发现自己的成长", "开始和朋友比较成绩"] },
  { prompt: "作者最想表达的观点是什么？", options: ["成长需要与别人比较", "只有大目标值得记录", "每天应完成很多任务", "关注小进步有助于坚持学习"] },
];

export default function ReadingPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const question = questions[current];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between"><Link href="/practice/setup" className="text-sm font-semibold text-indigo-700">← 重新选择</Link><span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-bold text-indigo-700">N2 · 阅读</span></div>
        <header className="mt-5 text-center"><p className="text-sm font-bold text-indigo-600">原创模拟题 · 阅读理解</p><h1 className="mt-1 text-2xl font-bold">阅读文章与子题</h1></header>

        <nav className="sticky top-0 z-20 mt-5 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur" aria-label="小题预览">
          <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-sm font-bold">题目预览</p><p className="text-xs text-slate-500">点击题号切换小题</p></div>
          <div className="mt-3 flex gap-2">{questions.map((_, index) => <button key={index} type="button" onClick={() => setCurrent(index)} aria-current={current === index ? "step" : undefined} className={`size-10 rounded-lg border text-sm font-bold ${current === index ? "border-indigo-600 bg-indigo-600 text-white" : answers[index] !== undefined ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-300 bg-white text-slate-600"}`}>{index + 1}</button>)}</div>
        </nav>

        <article className="relative z-10 mx-auto mt-6 max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-center text-xs font-bold tracking-widest text-slate-400">阅读文章</p><h2 className="mt-2 text-center text-xl font-bold" lang="ja">小さな進歩を記録する</h2>
          <div className="mt-5 space-y-4 text-base leading-8 text-slate-700" lang="ja"><p>新しいことを勉強していると、自分がどのくらい成長したのか分からなくなることがある。大きな目標だけを見ていると、まだできないことばかりが気になるからだ。</p><p>そこで私は、毎晩、その日に「できたこと」を一つノートに書くようにした。覚えた言葉や、少し聞き取れた会話など、とても小さなことでいい。</p><p>三か月続けてノートを読み返すと、以前は難しかったことが自然にできるようになっていた。成長は急には見えない。しかし、小さな変化に気づくことが、学習を続ける力になるのだと思う。</p></div>
        </article>

        <fieldset className="mx-auto mt-6 max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"><legend className="sr-only">第 {current + 1} 题</legend><p className="font-bold"><span className="mr-2 text-indigo-600">问题 {current + 1}</span>{question.prompt}</p><div className="mt-4 grid gap-2 sm:grid-cols-2">{question.options.map((option, index) => <label key={option} className={`flex cursor-pointer gap-3 rounded-lg border p-3 text-sm ${answers[current] === index ? "border-indigo-600 bg-indigo-50" : "border-slate-200 hover:bg-indigo-50"}`}><input type="radio" name={`reading-${current}`} checked={answers[current] === index} onChange={() => setAnswers((saved) => ({ ...saved, [current]: index }))} className="accent-indigo-600"/><span>{String.fromCharCode(65 + index)}. {option}</span></label>)}</div><div className="mt-5 flex justify-between"><button type="button" disabled={current === 0} onClick={() => setCurrent(current - 1)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold disabled:opacity-40">上一题</button><button type="button" onClick={() => current < questions.length - 1 ? setCurrent(current + 1) : undefined} className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white">{current === questions.length - 1 ? "提交本篇答案" : "下一题"}</button></div></fieldset>
      </div>
    </main>
  );
}
