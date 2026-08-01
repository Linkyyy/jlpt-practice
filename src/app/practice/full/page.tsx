import Link from "next/link";

const sections = [
  { category: "文字・词汇", questions: [{ prompt: "「改善」の読み方として最もよいものはどれですか。", options: ["かいぜん", "かいせん", "がいぜん", "がいせん"] }] },
  { category: "语法", questions: [{ prompt: "天気予報によると、午後から雨が降る（　）。", options: ["そうだ", "ように", "ために", "ほどだ"] }] },
  { category: "阅读", passage: "町の図書館では、利用者が本を探しやすいように、棚の案内を新しくした。また、入口の近くに相談カウンターを設けた。その結果、初めて来た人からも利用しやすくなったという声が増えた。", questions: [{ prompt: "図書館が案内を新しくした目的は何ですか。", options: ["本を増やすため", "本を探しやすくするため", "職員を減らすため", "入口を広くするため"] }, { prompt: "変更後、どのような反応が増えましたか。", options: ["利用しやすい", "本が少ない", "静かすぎる", "相談が難しい"] }] },
  { category: "听力", questions: [{ prompt: "男の人は、このあと何をしますか。", options: ["資料を読む", "電話をかける", "駅へ行く", "昼ご飯を作る"] }] },
];

export default function FullPracticePage() {
  let number = 0;
  const preview = sections.flatMap((section) => section.questions.map(() => ({ category: section.category, number: ++number })));
  number = 0;
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between"><Link href="/practice/setup" className="text-sm font-semibold text-indigo-700">← 重新选择</Link><span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-bold text-indigo-700">N2 · 整份卷子</span></div>
        <header className="mt-6"><p className="text-sm font-bold text-indigo-600">2026 年度原创模拟</p><h1 className="mt-1 text-3xl font-bold">综合练习卷</h1><p className="mt-2 text-slate-600">本卷包含文字词汇、语法、阅读和听力，所有题目在同一张练习卷中显示。</p></header>
        <nav className="sticky top-0 z-20 mt-6 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur" aria-label="整卷题目预览"><div className="flex flex-wrap items-center justify-between gap-2"><p className="font-bold">整卷题目预览</p><p className="text-xs text-slate-500">共 {preview.length} 题 · 点击跳转</p></div><div className="mt-3 flex flex-wrap gap-2">{preview.map((item) => <a key={item.number} href={`#full-question-${item.number}`} aria-label={`第 ${item.number} 题，${item.category}`} className="flex size-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-sm font-bold text-slate-700 hover:border-indigo-600 hover:text-indigo-700">{item.number}</a>)}</div></nav>
        <div className="mt-6 space-y-8">{sections.map((section) => <section key={section.category} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"><div className="flex items-center gap-3"><span className="rounded-lg bg-indigo-600 px-3 py-1 text-sm font-bold text-white">{section.category}</span><h2 className="text-xl font-bold">{section.category}部分</h2></div>{section.category === "听力" && <div className="mt-5 rounded-xl bg-slate-900 p-5 text-white"><div className="flex items-center gap-4"><button type="button" className="flex size-11 items-center justify-center rounded-full bg-indigo-500" aria-label="播放">▶</button><div className="flex-1"><div className="flex justify-between text-sm"><span>会话 01</span><span className="text-slate-400">00:00 / 00:36</span></div><div className="mt-2 h-2 rounded-full bg-slate-700" /></div></div></div>}{section.passage && <article className="mx-auto mt-5 max-w-2xl rounded-xl bg-slate-50 p-5 text-base leading-8 text-slate-700" lang="ja">{section.passage}</article>}<div className="mt-5 space-y-5">{section.questions.map((question) => { const questionNumber = ++number; return <fieldset id={`full-question-${questionNumber}`} key={question.prompt} className="scroll-mt-36 border-t border-slate-200 pt-5 first:border-0 first:pt-0"><legend className="sr-only">第 {questionNumber} 题</legend><p className="font-bold"><span className="mr-2 text-indigo-600">{questionNumber}.</span>{question.prompt}</p><div className="mt-3 grid gap-2 sm:grid-cols-2">{question.options.map((option, index) => <label key={option} className="flex cursor-pointer gap-3 rounded-lg border border-slate-200 p-3 text-sm hover:bg-indigo-50"><input type="radio" name={`full-${questionNumber}`} className="accent-indigo-600"/><span>{String.fromCharCode(65 + index)}. {option}</span></label>)}</div></fieldset>; })}</div></section>)}</div>
        <button type="button" className="mt-8 w-full rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white">提交整份试卷</button>
      </div>
    </main>
  );
}
