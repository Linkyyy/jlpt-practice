import Link from "next/link";

const questions = [
  {
    prompt: "作者开始记录「できたこと」的原因是什么？",
    options: ["为了提高工作速度", "为了注意到每天微小的进步", "为了向朋友介绍自己的生活", "为了制定更严格的计划"],
  },
  {
    prompt: "文章中提到，持续记录之后发生了什么变化？",
    options: ["每天的任务变少了", "不再需要学习新知识", "更容易发现自己的成长", "开始和朋友比较成绩"],
  },
  {
    prompt: "作者最想表达的观点是什么？",
    options: ["成长需要与别人比较", "只有大目标才值得记录", "每天都应该完成很多任务", "关注小进步有助于坚持学习"],
  },
];

export default function ReadingPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between"><Link href="/practice/setup" className="text-sm font-semibold text-indigo-700">← 重新选择</Link><span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-bold text-indigo-700">N2 · 阅读</span></div>
        <header className="mt-7"><p className="text-sm font-bold text-indigo-600">原创模拟题 · 阅读理解</p><h1 className="mt-2 text-3xl font-bold">阅读文章与子题</h1><p className="mt-2 text-slate-600">阅读同一篇文章，回答下面 3 道问题。</p></header>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-xs font-bold tracking-widest text-slate-400">文章</p>
            <h2 className="mt-2 text-xl font-bold" lang="ja">小さな進歩を記録する</h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-slate-700" lang="ja">
              <p>新しいことを勉強していると、自分がどのくらい成長したのか分からなくなることがある。大きな目標だけを見ていると、まだできないことばかりが気になるからだ。</p>
              <p>そこで私は、毎晩、その日に「できたこと」を一つノートに書くようにした。覚えた言葉や、少し聞き取れた会話など、とても小さなことでいい。</p>
              <p>三か月続けてノートを読み返すと、以前は難しかったことが自然にできるようになっていた。成長は急には見えない。しかし、小さな変化に気づくことが、学習を続ける力になるのだと思う。</p>
            </div>
          </article>
          <section className="space-y-4" aria-label="文章子题">
            {questions.map((question, questionIndex) => (
              <fieldset key={question.prompt} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <legend className="sr-only">第 {questionIndex + 1} 题</legend>
                <p className="font-bold"><span className="mr-2 text-indigo-600">{questionIndex + 1}.</span>{question.prompt}</p>
                <div className="mt-4 space-y-2">{question.options.map((option, index) => <label key={option} className="flex cursor-pointer gap-3 rounded-lg border border-slate-200 p-3 text-sm hover:bg-indigo-50"><input type="radio" name={`reading-${questionIndex}`} className="mt-0.5 accent-indigo-600"/><span>{String.fromCharCode(65 + index)}. {option}</span></label>)}</div>
              </fieldset>
            ))}
            <button type="button" className="w-full rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white">提交本篇答案</button>
          </section>
        </div>
      </div>
    </main>
  );
}
