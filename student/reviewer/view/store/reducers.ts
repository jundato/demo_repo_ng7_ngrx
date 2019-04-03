import { ViewState, initialState } from "./states";
import { Action } from "@ngrx/store/src";

import * as actions from "./actions";

export function viewReducer(
  state: ViewState = initialState,
  action: Action
): ViewState {
  switch (action.type) {
    case actions.SET_SECTIONS:
      return setSections(state, (action as actions.SetSections).payload);
    case actions.SELECT_SECTION_ORDER_NO:
      return selectSectionOrderNo(
        state,
        (action as actions.SelectSectionOrderNo).payload
      );
    default:
      return state;
  }
}

function selectSectionOrderNo(state: ViewState, payload: number): ViewState {
  return {
    ...state,
    sections: state.sections.map(section => {
      return {
        ...section,
        isSelected: section.orderNo === payload
      };
    }),
    questions: state.sections.find(section => section.orderNo === payload)
      .questions
  };
}

function setSections(
  state: ViewState,
  payload: actions.SetSectionPayload[]
): ViewState {
  return {
    ...state,
    questions: payload.length > 0 ? payload[0].questions : [],
    sections: payload.map((section, index) => {
      return {
        ...section,
        isSelected: index === 0
      };
    })
  };
}
