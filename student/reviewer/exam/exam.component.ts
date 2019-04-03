import { Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";

import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";

import { Store } from "@ngrx/store";

import { AppState } from "@app/store/states";

import * as parentActions from "../store/actions";
import * as actions from "./store/actions";
import { ExamState, ExamSettings } from "./store/states";
import { takeUntil, tap, withLatestFrom } from "rxjs/operators";
import { Subject, combineLatest } from "rxjs";
import { paramsIdSelector } from "@app/store/selectors/router.selector";
import {
  examStateSelector,
  activeSectionOrderNoSelector,
  examSettingsSelector
} from "./store/selectors";
import {
  sectionsSelector,
  reviewerStateSelector,
  hasLoadedSelector
} from "../store/selectors";
import { ReviewerState } from "../store/states";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { Progression, TimeLimit } from "@app/shared/lib";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FormService } from "@app/shared/services/form.service";
import { MatTabChangeEvent } from "@angular/material";

@Component({
  selector: "exam",
  templateUrl: "./exam.component.html",
  styleUrls: ["./exam.component.scss"],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class StudentReviewerExamComponent implements OnInit, OnDestroy {
  hasLoadedReviewer: boolean;
  examState: ExamState;
  examSettings: ExamSettings;
  reviewerState: ReviewerState;
  activeSectionOrderNo: number;

  form: FormGroup;

  progressionTypes = Progression.types;
  timeLimitTypes = TimeLimit.types;

  timeLimitType = TimeLimit.default;

  private onDestroy$ = new Subject<void>();

  /**
   * Constructor
   *
   * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
   */
  constructor(
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private fb: FormBuilder,
    private formService: FormService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store
      .select(hasLoadedSelector)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(hasLoaded => {
          this.hasLoadedReviewer = hasLoaded;
        })
      )
      .subscribe();
    this.store
      .select(paramsIdSelector)
      .pipe(
        takeUntil(this.onDestroy$),
        withLatestFrom(reviewerStateSelector),
        tap(reviewerState => {
          this.store.dispatch(new parentActions.InitStoreData());
        })
      )
      .subscribe();

    this.store
      .select(examStateSelector)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(examState => {
          this.examState = examState;
        })
      )
      .subscribe();
    this.store
      .select(reviewerStateSelector)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(reviewerState => {
          this.reviewerState = reviewerState;

          if (this.form) {
            this.form.patchValue({
              timeLimit: this.reviewerState.timeLimit,
              progression: this.reviewerState.progression
            });
            this.timeLimitType = this.reviewerState.timeLimit;
          }
        })
      )
      .subscribe();

    this.store
      .select(sectionsSelector)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(sections => {
          if (sections.length) {
            this.store.dispatch(new actions.CreateExam(sections));
          }
        })
      )
      .subscribe();

    this.store
      .select(activeSectionOrderNoSelector)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(activeSectionOrderNo => {
          this.activeSectionOrderNo = activeSectionOrderNo;
        })
      )
      .subscribe();

    this.store
      .select(examSettingsSelector)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(examSettings => {
          this.examSettings = examSettings;
        })
      )
      .subscribe();

    this.form = this.fb.group({
      timeLimit: this.reviewerState.timeLimit,
      progression: this.reviewerState.progression
    });

    this.formService.addForm(this.form);
  }

  onClickStart() {
    this.store.dispatch(new actions.StartExam(this.form.value));
    // this.store.dispatch(new actions.CreateExam());
  }

  onTimeLimitChange(event) {
    this.timeLimitType = event.value;
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent) {
    this.store.dispatch(new actions.SelectTab(tabChangeEvent.index));
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
