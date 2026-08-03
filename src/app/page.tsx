import Link from "next/link";

const studyStats = [
  { label: "今日答题", value: "0", unit: "题" },
  { label: "正确率", value: "0", unit: "%" },
  { label: "连续学习", value: "0", unit: "天" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white">JP</span>
            <span className="text-lg font-bold tracking-tight sm:text-xl">JLPT Practice</span>
          </div>
        </div>
      </header>

      <main className="flex flex-1 items-center">
        <div className="mx-auto grid w-full max-w-5xl gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14">
          <section aria-labelledby="welcome-heading">
            <p className="text-sm font-bold tracking-widest text-indigo-600">JLPT 每日练习</p>
            <h1 id="welcome-heading" className="mt-4 max-w-xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl sm:leading-tight">
              从今天的一次练习开始
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
              在下一页选择目标等级、年份和练习方式，按照自己的节奏稳步提升日语能力。
            </p>
            <Link href="/practice/setup" className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-7 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:w-auto">
              开始练习<span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </section>

          <section aria-labelledby="stats-heading" className="rounded-3xl bg-slate-900 p-6 text-white shadow-xl shadow-slate-200 sm:p-8">
            <p className="text-sm font-semibold tracking-wider text-indigo-300">TODAY</p>
            <h2 id="stats-heading" className="mt-2 text-2xl font-bold">今日学习情况</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">完成练习后，今天的学习记录会显示在这里。</p>
            <dl className="mt-7 divide-y divide-slate-700 rounded-2xl bg-slate-800/80 px-5 sm:grid sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-0 sm:py-5">
              {studyStats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between py-4 sm:block sm:px-3 sm:py-0 sm:text-center">
                  <dt className="text-sm text-slate-400">{stat.label}</dt>
                  <dd className="text-2xl font-bold sm:mt-2 sm:text-3xl">
                    {stat.value}<span className="ml-1 text-xs font-medium text-slate-400 sm:text-sm">{stat.unit}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-6 text-center text-sm text-slate-500 sm:px-8">JLPT Practice · 每天进步一点点</div>
      </footer>
    </div>
  );
}
