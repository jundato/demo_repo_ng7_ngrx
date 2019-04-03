import { Action } from "@ngrx/store";

//#region Initialize Store
export const INIT_STORE_DATA = "@pto/student/reviewer/init-store";
export class InitStoreData implements Action {
  readonly type = INIT_STORE_DATA;

  constructor() {}
}
//#endregion

//#region Get Reviewer
export const GET_REVIEWER = "@pto/student/reviewer/get-reviewer";
export class GetReviewer implements Action {
  readonly type = GET_REVIEWER;

  constructor() {}
}
//#endregion

//#region Get Reviewer Successful
export const GET_REVIEWER_SUCCESSFUL =
  "@pto/student/reviewer/get-reviewer-successful";
export interface GetReviewerSuccessfulPayload {
  id: string;
  createdByUserId: string;
  descriptionId: string;
  latestScriptId: string;
  scriptIds: string[];
}
export class GetReviewerSuccessful implements Action {
  readonly type = GET_REVIEWER_SUCCESSFUL;

  constructor(public payload: GetReviewerSuccessfulPayload) {}
}
//#endregion

//#region Get Reviewer Description
export const GET_REVIEWER_DESCRIPTION =
  "@pto/student/reviewer/get-reviewer-description";
export interface GetReviewerDescriptionPayload {
  reviewerId: string;
  descriptionId: string;
}
export class GetReviewerDescription implements Action {
  readonly type = GET_REVIEWER_DESCRIPTION;

  constructor(public payload: GetReviewerDescriptionPayload) {}
}
//#endregion

//#region Get Reviewer Description Successful
export const GET_REVIEWER_DESCRIPTION_SUCCESSFUL =
  "@pto/student/reviewer/get-reviewer-description-successful";
export interface GetReviewerDescriptionSuccessfulPayload {
  reviewerId: string;
  title: string;
  description: string;
  timeLimit: string;
  progression: string;
}
export class GetReviewerDescriptionSuccessful implements Action {
  readonly type = GET_REVIEWER_DESCRIPTION_SUCCESSFUL;

  constructor(public payload: GetReviewerDescriptionSuccessfulPayload) {}
}
//#endregion

//#region Get Reviewer Script
export const GET_REVIEWER_SCRIPT = "@pto/student/reviewer/get-reviewer-script";
export class GetReviewerScript implements Action {
  readonly type = GET_REVIEWER_SCRIPT;

  constructor(public payload: string) {}
}
//#endregion

//#region Get Reviewer Script Successful
export const GET_REVIEWER_SCRIPT_SUCCESSFUL =
  "@pto/student/reviewer/get-reviewer-script-successful";
export interface GetReviewerScriptSuccessfulAnswerPayload {
  orderNo: number;
  answerText: string;
  isCorrectAnswer: boolean;
}
export interface GetReviewerScriptSuccessfulQuestionPayload {
  orderNo: number;
  questionText: string;
  answers: GetReviewerScriptSuccessfulAnswerPayload[];
}
export interface GetReviewerScriptSuccessfulSectionPayload {
  description: string;
  numberOfQuestions: number;
  orderNo: number;
  title: string;
  timeLimit: number;
  questions: GetReviewerScriptSuccessfulQuestionPayload[];
}
export interface GetReviewerScriptSuccessfulPayload {
  versionNo: number;
  sections: GetReviewerScriptSuccessfulSectionPayload[];
}
export class GetReviewerScriptSuccessful implements Action {
  readonly type = GET_REVIEWER_SCRIPT_SUCCESSFUL;

  constructor(public payload: GetReviewerScriptSuccessfulPayload) {}
}
//#endregion

//#region Get Reviewer
export const NO_OPERATION = "@pto/student/reviewer/no_operation";
export class NoOperation implements Action {
  readonly type = NO_OPERATION;

  constructor() {}
}
//#endregion

export type Actions =
  | InitStoreData
  | GetReviewer
  | GetReviewerSuccessful
  | GetReviewerDescription
  | GetReviewerDescriptionSuccessful
  | GetReviewerScript
  | GetReviewerScriptSuccessful
  | NoOperation;
