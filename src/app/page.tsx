const levels = [
  { level: "N1", description: "挑战高阶词汇、复杂语法与深度阅读", tone: "bg-violet-600" },
  { level: "N2", description: "提升商务与日常场景中的综合理解力", tone: "bg-blue-600" },
  { level: "N3", description: "巩固中级日语，衔接基础与进阶内容", tone: "bg-cyan-600" },
  { level: "N4", description: "练习基础词汇、语法与生活短文", tone: "bg-emerald-600" },
  { level: "N5", description: "从常用表达和基础句型开始学习", tone: "bg-amber-500" },
];

const practiceTypes = [
  { name: "文字・词汇", label: "語", description: "汉字、读音与词义" },
  { name: "语法", label: "文", description: "句型、助词与表达" },
  { name: "阅读", label: "読", description: "短文与篇章理解" },
  { name: "听力", label: "聴", description: "场景对话与要点理解" },
];

const studyStats = [
  { label: "今日答题", value: "0", unit: "题" },
  { label: "正确率", value: "0", unit: "%" },
  { label: "连续学习", value: "0", unit: "天" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-18 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white">
              JP
            </span>
            <span className="text-lg font-bold tracking-tight sm:text-xl">JLPT Practice</span>
          </div>
          <button
            type="button"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            登录
          </button>
        </div>
      </header>

      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-bold tracking-widest text-indigo-600">日语能力考试专项练习</p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                选择目标等级，开始今天的练习
              </h1>
              <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
                按照自己的学习阶段进行词汇、语法、阅读和听力训练，稳步积累每一次进步。
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl space-y-14 px-5 py-10 sm:px-8 sm:py-14">
          <section aria-labelledby="level-heading">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-indigo-600">LEVEL</p>
                <h2 id="level-heading" className="mt-1 text-2xl font-bold tracking-tight">
                  选择练习等级
                </h2>
              </div>
              <p className="hidden text-sm text-slate-500 sm:block">N5 入门 · N1 进阶</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {levels.map((item) => (
                <article
                  key={item.level}
                  className="group flex min-h-56 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
                >
                  <span className={`flex size-11 items-center justify-center rounded-xl ${item.tone} text-base font-bold text-white`}>
                    {item.level}
                  </span>
                  <h3 className="mt-5 text-xl font-bold">JLPT {item.level}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{item.description}</p>
                  <button
                    type="button"
                    className="mt-5 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    开始练习
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="practice-heading">
            <p className="text-sm font-semibold text-indigo-600">PRACTICE</p>
            <h2 id="practice-heading" className="mt-1 text-2xl font-bold tracking-tight">
              专项练习
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {practiceTypes.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-indigo-200 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-lg font-bold text-indigo-700">
                    {item.label}
                  </span>
                  <span>
                    <span className="block font-bold text-slate-900">{item.name}</span>
                    <span className="mt-1 block text-sm text-slate-500">{item.description}</span>
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section aria-labelledby="stats-heading" className="rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
            <div className="grid gap-8 md:grid-cols-[1fr_2fr] md:items-center">
              <div>
                <p className="text-sm font-semibold text-indigo-300">TODAY</p>
                <h2 id="stats-heading" className="mt-1 text-2xl font-bold">
                  今日学习情况
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">开始一次练习，记录今天的学习进度。</p>
              </div>
              <dl className="grid grid-cols-3 divide-x divide-slate-700 rounded-xl bg-slate-800/70 py-5">
                {studyStats.map((stat) => (
                  <div key={stat.label} className="px-2 text-center sm:px-5">
                    <dt className="text-xs text-slate-400 sm:text-sm">{stat.label}</dt>
                    <dd className="mt-2 text-2xl font-bold sm:text-3xl">
                      {stat.value}
                      <span className="ml-1 text-xs font-medium text-slate-400 sm:text-sm">{stat.unit}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-6 text-center text-sm text-slate-500 sm:px-8">
          JLPT Practice · 每天进步一点点
        </div>
      </footer>
    </div>
  );
}
