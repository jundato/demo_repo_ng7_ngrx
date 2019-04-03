import { Action } from "@ngrx/store";

//#region Set Sections
export interface SetSectionAnswerPayload {
  orderNo: number;
  answerText: string;
  isCorrectAnswer: boolean;
}
export interface SetSectionQuestionPayload {
  orderNo: number;
  questionText: string;
  answers: SetSectionAnswerPayload[];
}
export interface SetSectionPayload {
  description: string;
  numberOfQuestions: number;
  orderNo: number;
  title: string;
  questions: SetSectionQuestionPayload[];
}
export const SET_SECTIONS = "@pto/student/reviewer/view/set-sections";
export class SetSections implements Action {
  readonly type = SET_SECTIONS;

  constructor(public payload: SetSectionPayload[]) {}
}
//#endregion

//#region Select Section
export const SELECT_SECTION_ORDER_NO =
  "@pto/student/reviewer/view/select-section-orderno";
export class SelectSectionOrderNo implements Action {
  readonly type = SELECT_SECTION_ORDER_NO;

  constructor(public payload: number) {}
}
//#endregion

export type Actions = SetSections | SelectSectionOrderNo;
