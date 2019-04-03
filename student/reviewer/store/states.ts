export interface Answer {
  orderNo: number;
  answerText: string;
  isCorrectAnswer: boolean;
}

export interface Section {
  isDisabled: boolean;
  orderNo: number;
  title: string;
  description: string;
  numberOfQuestions: number;
  timeLimit: number;
  questions: Question[];
}

export interface Question {
  orderNo: number;
  questionText: string;
  answers: Answer[];
}

export interface ReviewerState {
  id: string;
  descriptionId: string;
  latestScriptId: string;
  versionNo: number;

  title: string;
  description: string;
  timeLimit: string;
  progression: string;

  sections: Section[];
  hasLoaded: boolean;
}

export const initialState: ReviewerState = {
  id: "",
  descriptionId: "",
  latestScriptId: "",
  versionNo: 0,
  title: "",
  description: "",
  timeLimit: "",
  progression: "",
  sections: [],
  hasLoaded: false
};
