import { ExamState, initialState } from "./states";
import { Action } from "@ngrx/store/src";

import * as actions from "./actions";
import { Question } from "./states";
import * as moment from "moment";

export function examReducer(
  state: ExamState = initialState,
  action: Action
): ExamState {
  switch (action.type) {
    case actions.CREATE_EXAM:
      return createExam(state, (action as actions.CreateExam).payload);
    case actions.START_EXAM:
      return startExam(state, (action as actions.StartExam).payload);
    case actions.STUDENT_SELECTED_ANSWER:
      return studentSelectedAnswer(
        state,
        (action as actions.StudentSelectedAnswer).payload
      );
    case actions.SELECT_TAB:
      return selectTab(state, (action as actions.SelectTab).payload);
    case actions.BEGIN_SECTION:
      return beginSection(state, (action as actions.BeginSection).payload);
    case actions.NEXT_QUESTION:
      return nextQuestion(state);
    case actions.TIME_IS_UP:
      return timeIsUp(state);
    default:
      return state;
  }
}

function createExam(
  state: ExamState,
  sections: actions.CreateExamSectionPayload[]
): ExamState {
  function getRandomArraySet(set: any[], count: number): any[] {
    var randomArr = [],
      usedNums = {},
      x;
    while (randomArr.length < count) {
      while (usedNums[x] === true || x === undefined) {
        x = Math.floor(Math.random() * set.length);
      }
      usedNums[x] = true;
      randomArr.push(set[x]);
    }
    return randomArr;
  }

  const tState: ExamState = {
    ...state,
    sections: sections.map((section, sIndex) => {
      return {
        ...section,
        hasStarted: false,
        isActive: sIndex === 0,
        questions: getRandomArraySet(
          section.questions.map(question => {
            return {
              ...question,
              isSelected: false,
              answers: getRandomArraySet(
                question.answers,
                question.answers.length
              )
            };
          }),
          section.numberOfQuestions
        ).map((question, index) => {
          return { ...question, isSelected: index === 0, index: index };
        })
      };
    }),
    resultSections: sections.map(section => {
      return {
        orderNo: section.orderNo,
        resultQuestions: section.questions.map(question => {
          return {
            orderNo: question.orderNo,
            resultAnswers: question.answers.map(answer => {
              return {
                orderNo: answer.orderNo,
                isSelected: false,
                isCorrect: answer.isCorrectAnswer
              };
            })
          };
        })
      };
    })
  };

  return {
    ...tState
  };
}

function startExam(
  state: ExamState,
  payload: actions.StartExamPayload
): ExamState {
  return {
    ...state,
    hasStarted: true,
    activeSectionOrderNo: 1,
    activeQuestionIndex: 0,
    examSettings: {
      progression: payload.progression,
      timeLimit: payload.timeLimit
    }
  };
}

function studentSelectedAnswer(
  state: ExamState,
  payload: actions.AnswerQuestionPayload
): ExamState {
  return {
    ...state,
    resultSections: state.resultSections.map(section =>
      section.orderNo !== payload.sectionOrderNo
        ? section
        : {
            ...section,
            resultQuestions: section.resultQuestions.map(question =>
              question.orderNo !== payload.questionOrderNo
                ? question
                : {
                    ...question,
                    resultAnswers: question.resultAnswers.map(answer =>
                      answer.orderNo !== payload.answerOrderNo
                        ? answer
                        : {
                            ...answer,
                            isSelected: payload.isSelected
                          }
                    )
                  }
            )
          }
    )
  };
}

function selectTab(state: ExamState, payload: number): ExamState {
  return {
    ...state,
    activeSectionOrderNo: payload
  };
}

function beginSection(state: ExamState, payload: number): ExamState {
  console.log(payload * 60000 + moment.now());
  return {
    ...state,
    timerEnd: payload * 60000 + moment.now(),
    sections: state.sections.map(section => {
      if (section.orderNo === state.activeSectionOrderNo) {
        return {
          ...section,
          hasStarted: true
        };
      } else {
        return section;
      }
    })
  };
}

function nextQuestion(state: ExamState): ExamState {
  if (
    state.activeQuestionIndex + 1 <
    state.sections.find(
      section => section.orderNo === state.activeSectionOrderNo
    ).questions.length
  ) {
    return {
      ...state,
      activeQuestionIndex: state.activeQuestionIndex + 1
    };
  } else {
    return {
      ...state,
      activeSectionOrderNo: state.activeSectionOrderNo + 1,
      activeQuestionIndex: 0
    };
  }
}

function timeIsUp(state: ExamState): ExamState {
  return {
    ...state,
    activeSectionOrderNo: state.activeSectionOrderNo + 1,
    activeQuestionIndex: 0
  };
}
