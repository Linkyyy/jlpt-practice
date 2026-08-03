import Link from "next/link";
import { PracticeQuestionCard } from "./practice-question";
import { getPracticeQuestions } from "./questions";

type PracticePageProps = {
  searchParams: Promise<{ year?: string; level?: string; mode?: string; type?: string }>;
};

export default async function PracticePage({ searchParams }: PracticePageProps) {
  const { year = "2026", level = "N1", mode = "full", type } = await searchParams;
  const questions = getPracticeQuestions(year, level, mode, type);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-8">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white">
              JP
            </span>
            <span className="font-bold tracking-tight sm:text-lg">JLPT Practice</span>
          </Link>
          <Link href="/" className="text-sm font-semibold text-slate-600 transition-colors hover:text-indigo-700">
            返回首页
          </Link>
        </div>
      </header>

      <PracticeQuestionCard questions={questions} />
    </div>
  );
}
