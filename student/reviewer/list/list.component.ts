import { Component, OnInit, OnDestroy } from "@angular/core";

import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Store } from "@ngrx/store";

import { AppState } from "@app/store/states";

import { Subscription, Subject } from "rxjs";
import { reviewersSelector, purchasesSelector } from "@app/store/selectors/authentication.selector";
import * as actions from "./store/actions";
import { reviewerListSelector } from "./store/selectors";
import { Reviewer } from "./store/states";
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: "list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class StudentReviewerListComponent implements OnInit, OnDestroy {

  reviewers: Reviewer[] = [];

  private onDestroy$ = new Subject<void>();

  /**
   * Constructor
   *
   * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
   */
  constructor(
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.select(purchasesSelector).pipe(
      takeUntil(this.onDestroy$),
      tap(purchases => {
        this.store.dispatch(new actions.CreateReviewerList(purchases));
      })
    ).subscribe();

    this.store.select(reviewerListSelector).pipe(
      takeUntil(this.onDestroy$),
      tap(reviewers => {
        this.reviewers = reviewers;
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
