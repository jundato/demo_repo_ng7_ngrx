import { ListState, initialState } from "./states";
import { Action } from "@ngrx/store/src";

import * as actions from "./actions";

export function listReducer(
  state: ListState = initialState,
  action: Action
): ListState {
  switch (action.type) {
    case actions.SET_IS_BUSY:
      return setIsBusy(state, (action as actions.SetIsBusy).payload);
    case actions.CREATE_REVIEWER_LIST:
      return createReviewerList(state, (action as actions.CreateReviewerList).payload);
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
    default:
      return state;
  }
}

function setIsBusy(state: ListState, payload: boolean): ListState {
  return {
    ...state,
    isBusy: payload
  };
}

function createReviewerList(state: ListState, payload: string[]) {
  return {
    ...state,
    reviewers: payload.map(reviewerId => {
      return {
        id: reviewerId,
        descriptionId: "",
        title: "",
        description: "",
        hasLoaded: false
      };
    })
  };
}

function getReviewerSuccessful(
  state: ListState,
  payload: actions.GetReviewerSuccessfulPayload
) {
  return {
    ...state,
    reviewers: state.reviewers.map(reviewer => {
      if (reviewer.id === payload.reviewerId) {
        return {
          ...reviewer,
          descriptionId: payload.descriptionId
        };
      } else {
        return reviewer;
      }
    })
  };
}

function getReviewerDescriptionSuccessful(
  state: ListState,
  payload: actions.GetReviewerDescriptionSuccessfulPayload
) {
  return {
    ...state,
    reviewers: state.reviewers.map(reviewer => {
      if (reviewer.id === payload.reviewerId) {
        return {
          ...reviewer,
          title: payload.title,
          description: payload.description
        };
      } else {
        return reviewer;
      }
    })
  };
}

