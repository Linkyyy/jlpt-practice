"use client";

import { useState } from "react";
import type { PracticeQuestion } from "./question";

type PracticeQuestionCardProps = {
  question: PracticeQuestion;
};

export function PracticeQuestionCard({ question }: PracticeQuestionCardProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isCorrect = selectedOptionId === question.correctOptionId;
  const progress = (question.currentNumber / question.totalQuestions) * 100;

  function handleSubmit() {
    if (selectedOptionId !== null) {
      setIsSubmitted(true);
    }
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
              第 {question.currentNumber} 题 / 共 {question.totalQuestions} 题
            </p>
          </div>

          <div className="mt-5" aria-label={`答题进度 ${question.currentNumber}/${question.totalQuestions}`}>
            <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500">
              <span>答题进度</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
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
              if (isSelected) {
                optionStyle = "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600";
              }
              if (showCorrect) {
                optionStyle = "border-emerald-600 bg-emerald-50 ring-1 ring-emerald-600";
              } else if (showIncorrect) {
                optionStyle = "border-rose-500 bg-rose-50 ring-1 ring-rose-500";
              }

              return (
                <label
                  key={option.id}
                  className={`flex min-h-14 items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${optionStyle} ${isSubmitted ? "cursor-default" : "cursor-pointer"}`}
                >
                  <input
                    type="radio"
                    name="practice-answer"
                    value={option.id}
                    checked={isSelected}
                    onChange={() => setSelectedOptionId(option.id)}
                    className="sr-only"
                  />
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-current text-sm font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1 font-medium text-slate-800" lang="ja">
                    {option.text}
                  </span>
                  {showCorrect && <span className="text-sm font-bold text-emerald-700">正确答案</span>}
                  {showIncorrect && <span className="text-sm font-bold text-rose-700">你的选择</span>}
                  {isSubmitted && isSelected && isCorrectOption && (
                    <span className="text-sm font-bold text-emerald-700">你的选择</span>
                  )}
                </label>
              );
            })}
          </fieldset>

          {isSubmitted && (
            <div
              className={`mt-6 rounded-xl border p-4 sm:p-5 ${
                isCorrect ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"
              }`}
              role="status"
            >
              <p className={`font-bold ${isCorrect ? "text-emerald-800" : "text-rose-800"}`}>
                {isCorrect ? "回答正确！" : "回答错误"}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <span className="font-bold">解析：</span>
                {question.explanation}
              </p>
            </div>
          )}

          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            {isSubmitted && (
              <button
                type="button"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                下一题
              </button>
            )}
            {!isSubmitted && (
              <button
                type="button"
                disabled={selectedOptionId === null}
                onClick={handleSubmit}
                className="rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                提交答案
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
