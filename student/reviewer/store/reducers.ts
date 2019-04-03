import { ReviewerState, initialState } from "./states";
import { Action } from "@ngrx/store/src";

import * as actions from "./actions";

export function reviewerReducer(
  state: ReviewerState = initialState,
  action: Action
): ReviewerState {
  switch (action.type) {
    case actions.GET_REVIEWER:
      return getReviewer(state);
    case actions.GET_REVIEWER_SUCCESSFUL:
      return getReviewerSuccessful(
        state,
        (action as actions.GetReviewerSuccessful).payload
      );
    case actions.GET_REVIEWER_DESCRIPTION_SUCCESSFUL:
      return getReviewerDescriptionSuccessful(
        state,
        (action as actions.GetReviewerDescriptionSuccessful).payload
      );
    case actions.GET_REVIEWER_SCRIPT_SUCCESSFUL:
      return getReviewerScriptSuccessful(
        state,
        (action as actions.GetReviewerScriptSuccessful).payload
      );
    default:
      return state;
  }
}

function getReviewer(state: ReviewerState): ReviewerState {
  return {
    ...state,
    hasLoaded: false
  };
}

function getReviewerSuccessful(
  state: ReviewerState,
  payload: actions.GetReviewerSuccessfulPayload
): ReviewerState {
  return {
    ...state,
    descriptionId: payload.descriptionId,
    latestScriptId: payload.latestScriptId,
    id: payload.id
  };
}

function getReviewerDescriptionSuccessful(
  state: ReviewerState,
  payload: actions.GetReviewerDescriptionSuccessfulPayload
): ReviewerState {
  return {
    ...state,
    title: payload.title,
    description: payload.description,
    timeLimit: payload.timeLimit,
    progression: payload.progression
  };
}

function getReviewerScriptSuccessful(
  state: ReviewerState,
  payload: actions.GetReviewerScriptSuccessfulPayload
): ReviewerState {
  return {
    ...state,
    sections: payload.sections.map((section, index) => {
      return {
        ...section,
        isDisabled: true,
        isSelected: index === 0
      };
    }),
    versionNo: payload.versionNo,
    hasLoaded: true
  };
}
