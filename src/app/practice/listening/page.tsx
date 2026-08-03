import Link from "next/link";
import { PracticeQuestionCard } from "../practice-question";
import { getPracticeQuestions } from "../questions";

type ListeningPageProps = {
  searchParams: Promise<{ year?: string; level?: string }>;
};

export default async function ListeningPage({ searchParams }: ListeningPageProps) {
  const { year = "2026", level = "N1" } = await searchParams;
  const questions = getPracticeQuestions(year, level, "single", "听力");

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3 font-bold tracking-tight">
            <span className="flex size-9 items-center justify-center rounded-xl bg-indigo-600 text-sm text-white">JP</span>
            <span className="hidden sm:inline">JLPT Practice</span>
          </Link>
          <Link href="/practice/setup" className="text-sm font-semibold text-slate-600 hover:text-indigo-700">重新选择</Link>
        </div>
      </header>
      <PracticeQuestionCard questions={questions} />
    </div>
  );
}
