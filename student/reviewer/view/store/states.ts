export interface Answer {
  orderNo: number;
  answerText: string;
  isCorrectAnswer: boolean;
}

export interface Section {
  isSelected: boolean;
  orderNo: number;
  title: string;
  description: string;
  numberOfQuestions: number;
  questions: Question[];
}

export interface Question {
  orderNo: number;
  questionText: string;
  answers: Answer[];
}

export interface ViewState {
  sections: Section[];
  questions: Question[];
}

export const initialState: ViewState = {
  sections: [],
  questions: []
};
