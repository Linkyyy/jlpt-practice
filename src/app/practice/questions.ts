export type PracticeOption = { id: string; text: string };

export type PracticeQuestion = {
  id: string;
  level: string;
  year: string;
  section: "语言知识" | "阅读" | "听力";
  category: string;
  passage?: string;
  prompt: string;
  options: PracticeOption[];
  correctOptionId: string;
  explanation: string;
};

type QuestionGroup = {
  section: PracticeQuestion["section"];
  category: string;
  count: number;
};

// N1 模拟卷沿用考试的题型顺序与题量；所有题干均为本站原创演示内容。
export const n1PaperStructure: QuestionGroup[] = [
  { section: "语言知识", category: "汉字读音", count: 6 },
  { section: "语言知识", category: "语境选词", count: 7 },
  { section: "语言知识", category: "近义替换", count: 6 },
  { section: "语言知识", category: "词语用法", count: 6 },
  { section: "语言知识", category: "语法形式", count: 10 },
  { section: "语言知识", category: "句子重组", count: 5 },
  { section: "语言知识", category: "文章语法", count: 5 },
  { section: "阅读", category: "短篇理解", count: 4 },
  { section: "阅读", category: "中篇理解", count: 9 },
  { section: "阅读", category: "长篇理解", count: 4 },
  { section: "阅读", category: "综合理解", count: 3 },
  { section: "阅读", category: "主张理解", count: 4 },
  { section: "阅读", category: "信息检索", count: 2 },
  { section: "听力", category: "课题理解", count: 6 },
  { section: "听力", category: "要点理解", count: 7 },
  { section: "听力", category: "概要理解", count: 6 },
  { section: "听力", category: "即时应答", count: 14 },
  { section: "听力", category: "综合理解", count: 4 },
];

const yearTopics: Record<string, string[]> = {
  "2026": ["地域図書館", "働き方", "食品ロス", "オンライン学習", "公共交通", "町の緑化"],
  "2025": ["博物館", "研究発表", "商店街", "防災訓練", "旅行計画", "商品開発"],
  "2024": ["市民講座", "環境調査", "社内研修", "文化祭", "引っ越し", "健康習慣"],
};

const categoryInstructions: Record<PracticeQuestion["section"], string> = {
  语言知识: "（　）に入る最もよいものを一つ選びなさい。",
  阅读: "文章の内容に合うものとして、最もよいものを一つ選びなさい。",
  听力: "会話を聞いたとして、質問への答えとして最もよいものを一つ選びなさい。",
};

function createQuestion(year: string, level: string, group: QuestionGroup, groupIndex: number, index: number): PracticeQuestion {
  const topics = yearTopics[year] ?? yearTopics["2026"];
  const topic = topics[(groupIndex + index) % topics.length];
  const passageTopic = topics[groupIndex % topics.length];
  const serial = index + 1;
  const sectionLead = group.section === "语言知识"
    ? `${topic}についての案内は、参加者に分かりやすい表現で（　）必要がある。`
    : group.section === "阅读"
      ? `${topic}の取り組みでは、規模を急に広げるより、利用者の意見を確かめながら改善を続けることが重視されている。`
      : `${topic}の担当者は、まず参加人数を確認してから、必要な資料を準備すると話しています。`;

  const optionSets = group.section === "语言知识"
    ? ["伝える", "伝わる", "伝えた", "伝わった"]
    : group.section === "阅读"
      ? ["利用者の意見を取り入れながら進める", "最初から規模を最大にする", "改善せず同じ方法を続ける", "利用者を限定して意見を集めない"]
      : ["参加人数を確認する", "資料を捨てる", "会場を閉める", "予定を取り消す"];

  return {
    id: `${year}-${level.toLowerCase()}-${groupIndex + 1}-${serial}`,
    level,
    year,
    section: group.section,
    category: group.category,
    passage: group.section === "阅读"
      ? `${passageTopic}では、利用する人の声を定期的に集め、小さな改善を積み重ねている。担当者は、最初から大きな成果を求めるのではなく、実際の利用状況を確かめることが大切だと考えている。そのため、新しい方法を試した後も意見を聞き、必要に応じて計画を見直している。こうした取り組みは時間がかかるが、地域に合った仕組みを長く続けることにつながるという。`
      : undefined,
    prompt: group.section === "阅读"
      ? `【${group.category} ${serial}】筆者が最も伝えたいことは何か。 ${categoryInstructions[group.section]}`
      : `【${group.category} ${serial}】${sectionLead} ${categoryInstructions[group.section]}`,
    options: optionSets.map((text, optionIndex) => ({ id: String(optionIndex + 1), text })),
    correctOptionId: "1",
    explanation: `${year} 年度原创模拟卷的「${group.category}」题。根据题干信息，第一项最符合语境或内容。`,
  };
}

export function getPracticeQuestions(year = "2026", level = "N1", mode = "full", type?: string): PracticeQuestion[] {
  const selectedYear = yearTopics[year] ? year : "2026";
  const vocabularyCategories = new Set(["汉字读音", "语境选词", "近义替换", "词语用法"]);
  const grammarCategories = new Set(["语法形式", "句子重组", "文章语法"]);
  const groups = mode === "single" && type
    ? n1PaperStructure.filter((group) => group.section === type || (type === "文字・词汇" && vocabularyCategories.has(group.category)) || (type === "语法" && grammarCategories.has(group.category)))
    : n1PaperStructure;

  return groups.flatMap((group) => {
    const groupIndex = n1PaperStructure.indexOf(group);
    return Array.from({ length: group.count }, (_, index) => createQuestion(selectedYear, level, group, groupIndex, index));
  });
}

export const practiceQuestions = getPracticeQuestions();
