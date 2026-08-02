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
          <span className="flex size-9 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white">
            JP
          </span>
          <span className="ml-3 text-lg font-bold tracking-tight sm:text-xl">JLPT Practice</span>
        </div>
      </header>

      <main className="flex flex-1 items-center px-5 py-10 sm:px-8 sm:py-16">
        <div className="mx-auto grid w-full max-w-5xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="flex flex-col justify-center rounded-3xl bg-indigo-600 p-7 text-white shadow-sm sm:p-10">
            <p className="text-sm font-bold tracking-widest text-indigo-200">JLPT 每日练习</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">开始今天的日语练习</h1>
            <p className="mt-4 max-w-xl leading-7 text-indigo-100">
              下一步再选择等级、模拟年份和练习方式，专注完成每一次练习。
            </p>
            <Link
              href="/practice/setup"
              className="mt-8 w-full rounded-xl bg-white px-6 py-3.5 text-center font-bold text-indigo-700 transition hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-fit"
            >
              开始练习
            </Link>
          </section>

          <section aria-labelledby="stats-heading" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold text-indigo-600">TODAY</p>
            <h2 id="stats-heading" className="mt-1 text-2xl font-bold">今日学习情况</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">完成练习后，这里会记录今天的学习进度。</p>
            <dl className="mt-7 grid grid-cols-3 divide-x divide-slate-200 rounded-2xl bg-slate-50 py-6">
              {studyStats.map((stat) => (
                <div key={stat.label} className="px-2 text-center sm:px-4">
                  <dt className="text-xs text-slate-500 sm:text-sm">{stat.label}</dt>
                  <dd className="mt-2 text-2xl font-bold sm:text-3xl">
                    {stat.value}<span className="ml-1 text-xs font-medium text-slate-400 sm:text-sm">{stat.unit}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </main>
    </div>
  );
}
