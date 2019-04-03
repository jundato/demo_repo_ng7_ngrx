import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { Subject } from "rxjs";
import { Question, Section, ExamSettings } from "../store/states";
import { Store } from "@ngrx/store";
import { AppState } from "@app/store/states";

import * as actions from "../store/actions";
import { examSettingsSelector } from "../store/selectors";
import { takeUntil, tap } from "rxjs/operators";

@Component({
  selector: "[student-exam-question]",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.scss"]
})
export class QuestionComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  @Input()
  question: Question;
  @Input()
  section: Section;

  examSettings: ExamSettings;

  constructor(private store: Store<AppState>) {
    this.store
      .select(examSettingsSelector)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(examSettings => {
          this.examSettings = examSettings;
        })
      )
      .subscribe();
  }

  ngOnInit() {}

  onClickNextQuestion() {
    this.store.dispatch(new actions.NextQuestion());
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
