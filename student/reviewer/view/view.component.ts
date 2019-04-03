import { Component, OnInit, OnDestroy } from "@angular/core";

import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";

import { Store } from "@ngrx/store";

import { AppState } from "@app/store/states";

import * as parentActions from "../store/actions";
import * as actions from "./store/actions";
import { ViewState } from "./store/states";
import { takeUntil, tap, withLatestFrom } from "rxjs/operators";
import { Subject, combineLatest } from "rxjs";
import { paramsIdSelector } from "@app/store/selectors/router.selector";
import { viewStateSelector } from "./store/selectors";
import { sectionsSelector, reviewerStateSelector } from "../store/selectors";
import { ReviewerState } from "../store/states";

@Component({
  selector: "view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"]
})
export class StudentReviewerViewComponent implements OnInit, OnDestroy {
  viewState: ViewState;
  reviewerState: ReviewerState;

  private onDestroy$ = new Subject<void>();

  /**
   * Constructor
   *
   * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
   */
  constructor(
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store
      .select(paramsIdSelector)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(() => {
          this.store.dispatch(new parentActions.InitStoreData());
        })
      )
      .subscribe();
    this.store
      .select(viewStateSelector)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(viewState => {
          this.viewState = viewState;
        })
      )
      .subscribe();
    this.store
      .select(reviewerStateSelector)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(reviewerState => {
          this.reviewerState = reviewerState;
        })
      )
      .subscribe();

    this.store
      .select(sectionsSelector)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(sections => {
          console.log(sections);
          this.store.dispatch(new actions.SetSections(sections));
        })
      )
      .subscribe();
  }

  onSectionSelected(orderNo: number) {
    this.store.dispatch(new actions.SelectSectionOrderNo(orderNo));
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
