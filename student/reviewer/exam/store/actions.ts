import { Action } from "@ngrx/store";

//#region Set Sections
export interface CreateExamAnswerPayload {
  orderNo: number;
  answerText: string;
  isCorrectAnswer: boolean;
}
export interface CreateExamQuestionPayload {
  orderNo: number;
  questionText: string;
  answers: CreateExamAnswerPayload[];
}
export interface CreateExamSectionPayload {
  description: string;
  numberOfQuestions: number;
  orderNo: number;
  title: string;
  timeLimit: number;
  questions: CreateExamQuestionPayload[];
}
export const CREATE_EXAM = "@pto/student/reviewer/exam/create-exam";
export class CreateExam implements Action {
  readonly type = CREATE_EXAM;

  constructor(public payload: CreateExamSectionPayload[]) {}
}
//#endregion

export const STUDENT_SELECTED_ANSWER =
  "@pto/student/reviewer/exam/student-selected-answer";
export interface AnswerQuestionPayload {
  sectionOrderNo: number;
  questionOrderNo: number;
  answerOrderNo: number;
  isSelected: boolean;
}
export class StudentSelectedAnswer implements Action {
  readonly type = STUDENT_SELECTED_ANSWER;

  constructor(public payload: AnswerQuestionPayload) {}
}

export const START_EXAM = "@pto/student/reviewer/exam/start-exam";
export interface StartExamPayload {
  timeLimit: string;
  progression: string;
}
export class StartExam implements Action {
  readonly type = START_EXAM;

  constructor(public payload: StartExamPayload) {}
}

export const BEGIN_SECTION = "@pto/student/reviewer/exam/begin-section";
export class BeginSection implements Action {
  readonly type = BEGIN_SECTION;
  constructor(public payload: number) {}
}

export const NEXT_QUESTION = "@pto/student/reviewer/exam/next-question";
export class NextQuestion implements Action {
  readonly type = NEXT_QUESTION;
  constructor() {}
}

export const TIME_IS_UP = "@pto/student/reviewer/exam/time-is-up";
export class TimeIsUp implements Action {
  readonly type = TIME_IS_UP;
  constructor() {}
}

export const SELECT_TAB = "@pto/student/reviewer/exam/select-tab";
export class SelectTab implements Action {
  readonly type = SELECT_TAB;

  constructor(public payload: number) {}
}

export type Actions =
  | AnswerQuestionPayload
  | CreateExam
  | StartExam
  | BeginSection
  | NextQuestion
  | SelectTab;
