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
import { paramsIdSelector } from "@app/store/selectors/router.selector";
import { reviewerStateSelector } from "./selectors";
import { TimeLimit, Progression } from "@app/shared/lib";

@Injectable()
export class ReviewerEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private reviewerService: ReviewerService,
    private dialogService: ModalDialogService,
    private formService: FormService
  ) {}

  @Effect()
  initStoreData$: Observable<Action> = this.actions$.pipe(
    ofType(actions.INIT_STORE_DATA),
    debounceTime(300),
    withLatestFrom(this.store.select(reviewerStateSelector)),
    flatMap(([, reviewerState]) => {
      return reviewerState && !reviewerState.hasLoaded
        ? [new actions.GetReviewer()]
        : [];
    })
  );

  //#region Get Reviewer
  @Effect()
  getReviewer$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_REVIEWER),
    debounceTime(300),
    withLatestFrom(this.store.select(paramsIdSelector)),
    switchMap(([, paramsId]) => {
      return from(this.reviewerService.get(paramsId)).pipe(
        map(result => {
          return new actions.GetReviewerSuccessful({
            ...result,
            id: paramsId
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
          reviewerId: payload.id,
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
            description: description.description,
            timeLimit: description.timeLimit,
            progression: description.progression
          });
        })
      );
    })
  );
  //#endregion

  //#region Get Reviewer Description Successful
  @Effect()
  getReviewerDescriptionSuccessful$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_REVIEWER_DESCRIPTION_SUCCESSFUL),
    debounceTime(300),
    withLatestFrom(this.store.select(reviewerStateSelector)),
    switchMap(([, reviewerState]) =>
      of(new actions.GetReviewerScript(reviewerState.latestScriptId))
    )
  );
  //#endregion

  //#region Get Reviewer Script
  @Effect()
  getReviewerScript$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_REVIEWER_SCRIPT),
    debounceTime(300),
    map(action => (action as actions.GetReviewerScript).payload),
    switchMap(payload => {
      return from(this.reviewerService.getScript(payload)).pipe(
        flatMap(result => {
          return [new actions.GetReviewerScriptSuccessful(result)];
        })
      );
    })
  );
  //#endregion
}
