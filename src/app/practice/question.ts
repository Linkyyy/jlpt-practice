export type PracticeOption = {
  id: string;
  text: string;
};

export type PracticeQuestion = {
  level: "N2";
  category: "语法";
  currentNumber: number;
  totalQuestions: number;
  prompt: string;
  options: PracticeOption[];
  correctOptionId: string;
  explanation: string;
};

export const practiceQuestion: PracticeQuestion = {
  level: "N2",
  category: "语法",
  currentNumber: 1,
  totalQuestions: 10,
  prompt:
    "新しい図書館は、利用者の意見を参考にした（　）、以前より使いやすくなった。",
  options: [
    { id: "a", text: "うえで" },
    { id: "b", text: "ことから" },
    { id: "c", text: "ところを" },
    { id: "d", text: "ばかりに" },
  ],
  correctOptionId: "a",
  explanation:
    "「～たうえで」表示先完成前项动作，并以其结果为基础进行后项动作。句中先参考使用者的意见，再据此改善图书馆，因此应选择「うえで」。",
};
