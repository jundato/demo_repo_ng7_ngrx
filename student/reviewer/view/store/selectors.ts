import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ViewState } from "./states";

export const name = "studentReviewerView";
export const viewStateSelector = createFeatureSelector<ViewState>(name);
