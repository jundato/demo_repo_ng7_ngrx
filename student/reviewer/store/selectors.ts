import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ReviewerState } from "./states";

export const name = "studentReviewer";
export const reviewerStateSelector = createFeatureSelector<ReviewerState>(name);

export const hasLoadedSelector = createSelector(
  reviewerStateSelector,
  (state: ReviewerState) => state.hasLoaded
);

export const sectionsSelector = createSelector(
  reviewerStateSelector,
  (state: ReviewerState) => state.sections
);
