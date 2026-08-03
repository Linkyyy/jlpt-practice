import mockPapers from "./data/n1-mock-papers.json";

export type PracticeOption = {
  id: string;
  text: string;
};

export type PracticeQuestion = {
  id: string;
  level: string;
  year: string;
  section: "语言知识" | "阅读" | "听力";
  category: string;
  passage?: string;
  audioTranscript?: string;
  prompt: string;
  options: PracticeOption[];
  correctOptionId: string;
  explanation: string;
};

type StoredQuestion = Omit<PracticeQuestion, "level" | "year">;

type PracticePaper = {
  year: string;
  level: string;
  questions: StoredQuestion[];
};

type QuestionGroup = {
  section: PracticeQuestion["section"];
  category: string;
  count: number;
};

const papers = mockPapers.papers as PracticePaper[];
export const n1PaperStructure = mockPapers.paperStructure as QuestionGroup[];
const vocabularyCategories = new Set(["汉字读音", "语境选词", "近义替换", "词语用法"]);
const grammarCategories = new Set(["语法形式", "句子重组", "文章语法"]);

function matchesPracticeType(question: PracticeQuestion, type: string) {
  return question.section === type
    || (type === "文字・词汇" && vocabularyCategories.has(question.category))
    || (type === "语法" && grammarCategories.has(question.category));
}

export function getPracticeQuestions(year = "2026", level = "N1", mode = "full", type?: string): PracticeQuestion[] {
  const selectedPaper = papers.find((paper) => paper.year === year && paper.level === level)
    ?? papers.find((paper) => paper.year === year)
    ?? papers[0];

  const defaultPaper = papers[0];
  const questions = n1PaperStructure.flatMap((group, groupIndex) => {
    const yearQuestions = selectedPaper.questions.filter((question) => question.category === group.category);
    const categoryQuestions = yearQuestions.length > 0
      ? yearQuestions
      : defaultPaper.questions.filter((question) => question.category === group.category);
    const sourceQuestions = categoryQuestions.length > 0
      ? categoryQuestions
      : defaultPaper.questions.filter((question) => question.section === group.section);

    return Array.from({ length: group.count }, (_, index) => {
      const source = sourceQuestions[index % sourceQuestions.length];
      return {
        ...source,
        id: `${selectedPaper.year}-${selectedPaper.level.toLowerCase()}-${groupIndex + 1}-${index + 1}`,
        year: selectedPaper.year,
        level: selectedPaper.level,
        section: group.section,
        category: group.category,
      };
    });
  });

  return mode === "single" && type
    ? questions.filter((question) => matchesPracticeType(question, type))
    : questions;
}

export const practiceQuestions = getPracticeQuestions();
