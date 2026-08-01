export type PracticeOption = {
  id: string;
  text: string;
};

export type PracticeQuestion = {
  id: string;
  level: "N2";
  category: "语法";
  prompt: string;
  options: PracticeOption[];
  correctOptionId: string;
  explanation: string;
};

export const practiceQuestions: PracticeQuestion[] = [
  {
    id: "n2-grammar-1",
    level: "N2",
    category: "语法",
    prompt: "新しい図書館は、利用者の意見を参考にした（　）、以前より使いやすくなった。",
    options: [
      { id: "a", text: "うえで" },
      { id: "b", text: "ことから" },
      { id: "c", text: "ところを" },
      { id: "d", text: "ばかりに" },
    ],
    correctOptionId: "a",
    explanation:
      "「～たうえで」表示先完成前项动作，并以其结果为基础进行后项动作。句中先参考使用者的意见，再据此改善图书馆，因此应选择「うえで」。",
  },
  {
    id: "n2-grammar-2",
    level: "N2",
    category: "语法",
    prompt: "この仕事は経験が必要だが、経験が長ければいいという（　）。",
    options: [
      { id: "a", text: "わけではない" },
      { id: "b", text: "ことになっている" },
      { id: "c", text: "ものがある" },
      { id: "d", text: "おそれがある" },
    ],
    correctOptionId: "a",
    explanation:
      "「～わけではない」用于否定由前文容易推导出的结论，表示“并非……”。这里强调并不是经验越久就一定越好。",
  },
  {
    id: "n2-grammar-3",
    level: "N2",
    category: "语法",
    prompt: "会議の資料は、参加者の人数（　）用意してください。",
    options: [
      { id: "a", text: "に反して" },
      { id: "b", text: "に応じて" },
      { id: "c", text: "に加えて" },
      { id: "d", text: "に限って" },
    ],
    correctOptionId: "b",
    explanation:
      "「～に応じて」表示根据某种情况采取相应行动。资料份数需要按照参加人数准备，因此选择「に応じて」。",
  },
  {
    id: "n2-grammar-4",
    level: "N2",
    category: "语法",
    prompt: "電車が止まっていたため、約束の時間に間に合い（　）。",
    options: [
      { id: "a", text: "かねなかった" },
      { id: "b", text: "っこなかった" },
      { id: "c", text: "ようがなかった" },
      { id: "d", text: "そうになかった" },
    ],
    correctOptionId: "d",
    explanation:
      "动词ます形加「そうにない／そうもない」表示从当前情况判断，实现某事的可能性很低。句中因电车停运，看起来无法准时到达。",
  },
  {
    id: "n2-grammar-5",
    level: "N2",
    category: "语法",
    prompt: "この機械は、ふたを開けると自動的に電源が切れる（　）。",
    options: [
      { id: "a", text: "ことになっている" },
      { id: "b", text: "ことにしている" },
      { id: "c", text: "ようになっている" },
      { id: "d", text: "ようにしている" },
    ],
    correctOptionId: "c",
    explanation:
      "「～ようになっている」表示事物被设计成某种状态或具有某种机制。这里说明机器被设计为打开盖子便会自动断电。",
  },
];
