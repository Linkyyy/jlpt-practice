"use client";

import { useState } from "react";
import type { PracticeQuestion } from "./questions";

type UserAnswer = {
  questionId: string;
  selectedOptionId: string;
};

type PracticeQuestionCardProps = {
  questions: PracticeQuestion[];
};

export function PracticeQuestionCard({ questions }: PracticeQuestionCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);

  const question = questions[currentIndex];
  const currentAnswer = answers.find((answer) => answer.questionId === question.id);
  const isSubmitted = currentAnswer !== undefined;
  const isCorrect = selectedOptionId === question.correctOptionId;
  const isComplete = answers.length === questions.length;
  const progress = (answers.length / questions.length) * 100;

  function handleSubmit() {
    if (selectedOptionId === null) return;

    setAnswers((currentAnswers) => [
      ...currentAnswers,
      { questionId: question.id, selectedOptionId },
    ]);
  }

  function handleNext() {
    if (isComplete) {
      setShowResults(true);
      return;
    }

    const nextUnansweredIndex = questions.findIndex((item, index) =>
      index > currentIndex && !answers.some((answer) => answer.questionId === item.id),
    );
    const firstUnansweredIndex = questions.findIndex(
      (item) => !answers.some((answer) => answer.questionId === item.id),
    );

    setCurrentIndex(nextUnansweredIndex >= 0 ? nextUnansweredIndex : firstUnansweredIndex);
    setSelectedOptionId(null);
  }

  function handleQuestionSelect(index: number) {
    const answer = answers.find((item) => item.questionId === questions[index].id);
    setCurrentIndex(index);
    setSelectedOptionId(answer?.selectedOptionId ?? null);
  }

  function handleRestart() {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setAnswers([]);
    setShowResults(false);
  }

  if (showResults) {
    return <PracticeResults questions={questions} answers={answers} onRestart={handleRestart} />;
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-8 sm:py-10">
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-3xl">
        <div className="border-b border-slate-200 px-5 py-5 sm:px-8 sm:py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-indigo-600 px-3 py-1 text-sm font-bold text-white">
                {question.level}
              </span>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
                {question.category}
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-600">
              第 {currentIndex + 1} 题 / 共 {questions.length} 题
            </p>
          </div>

          <div className="mt-5" aria-label={`答题进度 ${answers.length}/${questions.length}`}>
            <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500">
              <span>答题进度</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <QuestionOverview
            questions={questions}
            answers={answers}
            currentIndex={currentIndex}
            onSelect={handleQuestionSelect}
          />
        </div>

        <div className="px-5 py-6 sm:px-8 sm:py-8">
          <p className="text-sm font-bold tracking-wide text-indigo-600">请选择最合适的一项</p>
          <h1 className="mt-3 text-lg leading-8 font-bold text-slate-950 sm:text-xl sm:leading-9" lang="ja">
            {question.prompt}
          </h1>

          <fieldset className="mt-7 space-y-3" disabled={isSubmitted}>
            <legend className="sr-only">答案选项</legend>
            {question.options.map((option, index) => {
              const isSelected = selectedOptionId === option.id;
              const isCorrectOption = option.id === question.correctOptionId;
              const showCorrect = isSubmitted && isCorrectOption;
              const showIncorrect = isSubmitted && isSelected && !isCorrectOption;
              let optionStyle = "border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40";

              if (isSelected) optionStyle = "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600";
              if (showCorrect) optionStyle = "border-emerald-600 bg-emerald-50 ring-1 ring-emerald-600";
              else if (showIncorrect) optionStyle = "border-rose-500 bg-rose-50 ring-1 ring-rose-500";

              return (
                <label
                  key={option.id}
                  className={`flex min-h-14 items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${optionStyle} ${isSubmitted ? "cursor-default" : "cursor-pointer"}`}
                >
                  <input
                    type="radio"
                    name={`practice-answer-${question.id}`}
                    value={option.id}
                    checked={isSelected}
                    onChange={() => setSelectedOptionId(option.id)}
                    className="sr-only"
                  />
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-current text-sm font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1 font-medium text-slate-800" lang="ja">{option.text}</span>
                  {showCorrect && <span className="text-sm font-bold text-emerald-700">正确答案</span>}
                  {showIncorrect && <span className="text-sm font-bold text-rose-700">你的选择</span>}
                  {showCorrect && isSelected && <span className="text-sm font-bold text-emerald-700">你的选择</span>}
                </label>
              );
            })}
          </fieldset>

          {isSubmitted && (
            <div className={`mt-6 rounded-xl border p-4 sm:p-5 ${isCorrect ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"}`} role="status">
              <p className={`font-bold ${isCorrect ? "text-emerald-800" : "text-rose-800"}`}>
                {isCorrect ? "回答正确！" : "回答错误"}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <span className="font-bold">解析：</span>{question.explanation}
              </p>
            </div>
          )}

          <div className="mt-7 flex justify-end">
            {isSubmitted ? (
              <button type="button" onClick={handleNext} className="w-full rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:w-auto">
                {isComplete ? "查看结果" : "下一题"}
              </button>
            ) : (
              <button type="button" disabled={selectedOptionId === null} onClick={handleSubmit} className="w-full rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto">
                提交答案
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

type QuestionOverviewProps = {
  questions: PracticeQuestion[];
  answers: UserAnswer[];
  currentIndex?: number;
  onSelect: (index: number) => void;
};

function QuestionOverview({ questions, answers, currentIndex, onSelect }: QuestionOverviewProps) {
  const overview = (
    <div className="mt-3 flex flex-wrap gap-2">
      {questions.map((item, index) => {
        const answer = answers.find((savedAnswer) => savedAnswer.questionId === item.id);
        const answeredCorrectly = answer?.selectedOptionId === item.correctOptionId;
        let statusStyle = "border-slate-300 bg-white text-slate-600 hover:border-indigo-400";
        let statusLabel = "未作答";

        if (answer) {
          statusStyle = answeredCorrectly
            ? "border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700"
            : "border-rose-600 bg-rose-600 text-white hover:bg-rose-700";
          statusLabel = answeredCorrectly ? "回答正确" : "回答错误";
        }

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`第 ${index + 1} 题，题型 ${item.category}，${statusLabel}`}
            aria-current={currentIndex === index ? "step" : undefined}
            className={`flex min-w-20 flex-col items-center justify-center rounded-lg border px-3 py-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${statusStyle} ${currentIndex === index ? "ring-2 ring-indigo-500 ring-offset-2" : ""}`}
          >
            <span>第 {index + 1} 题</span>
            <span className="mt-0.5 text-xs font-medium opacity-80">{item.category}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <nav className="mt-5 border-t border-slate-200 pt-5" aria-label="题目答题总览">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-bold text-slate-700">题目答题总览</p>
        <div className="flex items-center gap-3 text-xs text-slate-500" aria-hidden="true">
          <span className="flex items-center gap-1"><span className="size-2.5 rounded-full bg-emerald-600" />正确</span>
          <span className="flex items-center gap-1"><span className="size-2.5 rounded-full bg-rose-600" />错误</span>
          <span className="flex items-center gap-1"><span className="size-2.5 rounded-full bg-slate-300" />未答</span>
        </div>
      </div>
      <details className="mt-3 sm:hidden">
        <summary className="cursor-pointer rounded-lg bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">展开题目预览</summary>
        {overview}
      </details>
      <div className="hidden sm:block">{overview}</div>
    </nav>
  );
}

type PracticeResultsProps = {
  questions: PracticeQuestion[];
  answers: UserAnswer[];
  onRestart: () => void;
};

function PracticeResults({ questions, answers, onRestart }: PracticeResultsProps) {
  const correctCount = questions.filter((question) =>
    answers.some((answer) => answer.questionId === question.id && answer.selectedOptionId === question.correctOptionId),
  ).length;
  const incorrectCount = questions.length - correctCount;
  const accuracy = Math.round((correctCount / questions.length) * 100);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-8 sm:py-10">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-8">
        <p className="text-sm font-bold tracking-wide text-indigo-600">练习完成</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">本轮练习结果</h1>

        <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "总题数", value: questions.length },
            { label: "正确数", value: correctCount },
            { label: "错误数", value: incorrectCount },
            { label: "正确率", value: `${accuracy}%` },
          ].map((item) => (
            <div key={item.label} className="rounded-xl bg-slate-50 p-4 text-center">
              <dt className="text-sm text-slate-500">{item.label}</dt>
              <dd className="mt-1 text-2xl font-bold text-slate-950">{item.value}</dd>
            </div>
          ))}
        </dl>

        <QuestionOverview
          questions={questions}
          answers={answers}
          onSelect={(index) => {
            document.getElementById(`result-question-${index + 1}`)?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }}
        />

        <div className="mt-8 space-y-4">
          <h2 className="text-lg font-bold text-slate-950">逐题结果</h2>
          {questions.map((question, index) => {
            const answer = answers.find((item) => item.questionId === question.id);
            const selectedOption = question.options.find((option) => option.id === answer?.selectedOptionId);
            const correctOption = question.options.find((option) => option.id === question.correctOptionId);
            const answeredCorrectly = answer?.selectedOptionId === question.correctOptionId;

            return (
              <article id={`result-question-${index + 1}`} key={question.id} className={`scroll-mt-6 rounded-xl border p-4 ${answeredCorrectly ? "border-emerald-200 bg-emerald-50/60" : "border-rose-200 bg-rose-50/60"}`}>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-bold text-slate-900">第 {index + 1} 题</h3>
                  <span className={`shrink-0 text-sm font-bold ${answeredCorrectly ? "text-emerald-700" : "text-rose-700"}`}>
                    {answeredCorrectly ? "正确" : "错误"}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-700" lang="ja">{question.prompt}</p>
                <dl className="mt-3 space-y-1 text-sm">
                  <div><dt className="inline font-semibold text-slate-600">你的答案：</dt><dd className="inline text-slate-800" lang="ja">{selectedOption?.text ?? "未作答"}</dd></div>
                  <div><dt className="inline font-semibold text-slate-600">正确答案：</dt><dd className="inline text-slate-800" lang="ja">{correctOption?.text}</dd></div>
                </dl>
              </article>
            );
          })}
        </div>

        <button type="button" onClick={onRestart} className="mt-8 w-full rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:w-auto">
          重新练习
        </button>
      </section>
    </main>
  );
}
