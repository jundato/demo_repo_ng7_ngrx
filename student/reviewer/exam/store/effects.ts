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
import { examStateSelector } from "./selectors";

@Injectable()
export class ExamEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private reviewerService: ReviewerService,
    private dialogService: ModalDialogService,
    private formService: FormService
  ) {}
}
