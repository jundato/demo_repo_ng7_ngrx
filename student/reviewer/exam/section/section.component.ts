import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from "@angular/core";
import { Subject } from "rxjs";
import { Section, ExamSettings, Question } from "../store/states";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { AppState } from "@app/store/states";
import { Store } from "@ngrx/store";
import * as actions from "../store/actions";
import {
  examSettingsSelector,
  activeQuestionIndexSelector
} from "../store/selectors";
import { takeUntil, tap } from "rxjs/operators";
import { sectionsSelector } from "@app/main/tutor/reviewer/manage/store/selectors";

@Component({
  selector: "student-exam-section",
  templateUrl: "./section.component.html",
  styleUrls: ["./section.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class SectionComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  @Input()
  section: Section;
  @Input()
  isActive: boolean;

  filteredQuestions: Question[] = [];

  examSettings: ExamSettings;
  activeQuestionIndex: number;
  timerEnd: number;
  hasStarted: boolean;

  constructor(
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private store: Store<AppState>
  ) {
    this.store
      .select(examSettingsSelector)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(examSettings => {
          this.examSettings = examSettings;
        })
      )
      .subscribe();

    this.store
      .select(activeQuestionIndexSelector)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(index => {
          this.activeQuestionIndex = index;
        })
      )
      .subscribe();
  }

  filterQuestions(questions: Question[]): Question[] {
    return questions.filter(
      (question, index) =>
        (this.examSettings.progression === "QUESTION_BY_QUESTION" &&
          index === this.activeQuestionIndex) ||
        this.examSettings.progression === "FREE_MODE"
    );
  }

  onClickBeginSection() {
    this.store.dispatch(new actions.BeginSection(this.section.timeLimit));
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
