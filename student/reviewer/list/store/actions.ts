import { Action } from "@ngrx/store";

//#region Set Is Busy
export const SET_IS_BUSY = "@pto/student/reviewer/list/set-isbusy";
export class SetIsBusy implements Action {
  readonly type = SET_IS_BUSY;

  constructor(public payload: boolean) {}
}
//#endregion

//#region Get Reviewers
export const CREATE_REVIEWER_LIST =
  "@pto/student/reviewer/list/create-reviewer-list";
export class CreateReviewerList implements Action {
  readonly type = CREATE_REVIEWER_LIST;

  constructor(public payload: string[]) {}
}
//#endregion

//#region Get Reviewer
export const GET_REVIEWER = "@pto/student/reviewer/list/get-reviewer";
export class GetReviewer implements Action {
  readonly type = GET_REVIEWER;

  constructor(public payload: string) {}
}
//#endregion

//#region Get Reviewer Successful
export const GET_REVIEWER_SUCCESSFUL =
  "@pto/student/reviewer/list/get-reviewer-successful";
export interface GetReviewerSuccessfulPayload {
  reviewerId: string;
  descriptionId: string;
}
export class GetReviewerSuccessful implements Action {
  readonly type = GET_REVIEWER_SUCCESSFUL;

  constructor(public payload: GetReviewerSuccessfulPayload) {}
}
//#endregion

//#region Get Reviewer Description
export const GET_REVIEWER_DESCRIPTION =
  "@pto/student/reviewer/list/get-reviewer-description";
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
  "@pto/student/reviewer/list/get-reviewer-description-successful";
export interface GetReviewerDescriptionSuccessfulPayload {
  reviewerId: string;
  title: string;
  description: string;
}
export class GetReviewerDescriptionSuccessful implements Action {
  readonly type = GET_REVIEWER_DESCRIPTION_SUCCESSFUL;

  constructor(public payload: GetReviewerDescriptionSuccessfulPayload) {}
}
//#endregion

export type Actions =
  | SetIsBusy
  | CreateReviewerList
  | GetReviewerDescription
  | GetReviewerDescriptionSuccessful;
