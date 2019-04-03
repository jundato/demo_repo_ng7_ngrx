import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store, Action } from "@ngrx/store";
import { AppState } from "@app/store/states";
import { Injectable } from "@angular/core";
import { FormService } from "@app/shared/services/form.service";
import { Router } from "@angular/router";
import { Observable, from, of } from "rxjs";
import * as actions from "./actions";
import * as routerActions from "@app/store/actions";
import {
  debounceTime,
  map,
  switchMap,
  withLatestFrom,
  tap,
  flatMap,
  mergeMap
} from "rxjs/operators";
import { ReviewerService } from "@app/shared/services/reviewer.service";
import { ModalDialogService } from "@app/shared/services/dialog.service";
import { reviewerListSelector } from "./selectors";

@Injectable()
export class ListEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private reviewerService: ReviewerService,
    private dialogService: ModalDialogService,
    private formService: FormService
  ) {}
  //#region Get Reviewer Description Successful
  @Effect()
  getReviewerInfo$: Observable<Action> = this.actions$.pipe(
    ofType(actions.CREATE_REVIEWER_LIST),
    debounceTime(300),
    map(action => (action as actions.CreateReviewerList).payload),
    flatMap(reviewerIds => {
      const tActions = reviewerIds.map(
        reviewerId => new actions.GetReviewer(reviewerId)
      );
      return tActions;
    })
  );
  //#endregion

  //#region Get Reviewer Description Successful
  @Effect()
  getReviewer$ = this.actions$.pipe(
    ofType(actions.GET_REVIEWER),
    map(action => (action as actions.GetReviewer).payload),
    mergeMap(reviewerId => {
      return from(this.reviewerService.get(reviewerId)).pipe(
        map(reviewer => {
          return new actions.GetReviewerSuccessful({
            reviewerId: reviewerId,
            descriptionId: reviewer.descriptionId
          });
        })
      );
    })
  );
  //#endregion

  //#region Get Reviewer Successful
  @Effect()
  getReviewerSuccessful$ = this.actions$.pipe(
    ofType(actions.GET_REVIEWER_SUCCESSFUL),
    map(action => (action as actions.GetReviewerSuccessful).payload),
    switchMap(payload => {
      return of(
        new actions.GetReviewerDescription({
          reviewerId: payload.reviewerId,
          descriptionId: payload.descriptionId
        })
      );
    })
  );
  //#endregion

  //#region Get Reviewer Description
  @Effect()
  getReviewerDescription$ = this.actions$.pipe(
    ofType(actions.GET_REVIEWER_DESCRIPTION),
    map(action => (action as actions.GetReviewerDescription).payload),
    mergeMap(payload => {
      return from(
        this.reviewerService.getDescription(payload.descriptionId)
      ).pipe(
        map(description => {
          return new actions.GetReviewerDescriptionSuccessful({
            reviewerId: payload.reviewerId,
            title: description.title,
            description: description.description
          });
        })
      );
    })
  );
  //#endregion
}
