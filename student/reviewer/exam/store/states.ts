import { Progression, TimeLimit } from "@app/shared/lib";

export interface ResultAnswer {
  orderNo: number;
  isSelected: boolean;
  isCorrect: boolean;
}

export interface ResultQuestion {
  orderNo: number;
  resultAnswers: ResultAnswer[];
}

export interface ResultSection {
  orderNo: number;
  resultQuestions: ResultQuestion[];
}

export interface Answer {
  orderNo: number;
  answerText: string;
  isCorrectAnswer: boolean;
}

export interface Section {
  hasStarted: boolean;
  isActive: boolean;
  orderNo: number;
  title: string;
  description: string;
  numberOfQuestions: number;
  timeLimit: number;
  questions: Question[];
}

export interface Question {
  index: number;
  isSelected: boolean;
  orderNo: number;
  questionText: string;
  answers: Answer[];
}

export interface ExamSettings {
  timeLimit: string;
  progression: string;
}

export interface ExamState {
  hasLoaded: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  activeSectionOrderNo: number;
  activeQuestionIndex: number;
  sections: Section[];
  resultSections: ResultSection[];
  examSettings: ExamSettings;
  timerEnd: number;
}

export const initialState: ExamState = {
  hasLoaded: false,
  hasStarted: false,
  hasFinished: false,
  activeSectionOrderNo: 0,
  activeQuestionIndex: 0,
  sections: [],
  resultSections: [],
  timerEnd: 0,
  examSettings: {
    timeLimit: TimeLimit.default,
    progression: Progression.default
  }
};
