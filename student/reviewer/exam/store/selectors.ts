import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ExamState } from "./states";

export const name = "studentReviewerExam";
export const examStateSelector = createFeatureSelector<ExamState>(name);

export const activeSectionOrderNoSelector = createSelector(
  examStateSelector,
  (state: ExamState) => state.activeSectionOrderNo
);

export const activeQuestionIndexSelector = createSelector(
  examStateSelector,
  (state: ExamState) => state.activeQuestionIndex
);

export const examSettingsSelector = createSelector(
  examStateSelector,
  (state: ExamState) => state.examSettings
);

export const timerEndSelector = createSelector(
  examStateSelector,
  (state: ExamState) => state.timerEnd
);
