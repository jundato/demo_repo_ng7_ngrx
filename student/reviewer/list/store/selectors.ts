import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ListState } from "./states";

export const name = "studentReviewerList";
export const listStateSelector = createFeatureSelector<ListState>(name);

export const isBusySelector = createSelector(
  listStateSelector,
  (state: ListState) => state.isBusy
);

export const reviewerListSelector = createSelector(
  listStateSelector,
  (state: ListState) => state.reviewers
);
