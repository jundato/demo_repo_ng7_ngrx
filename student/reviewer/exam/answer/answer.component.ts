import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter
} from "@angular/core";
import { Subject } from "rxjs";
import { Section, Question, Answer } from "../store/states";
import { AppState } from "@app/store/states";
import { Store } from "@ngrx/store";
import * as actions from "../store/actions";

@Component({
  selector: "student-exam-answer",
  templateUrl: "./answer.component.html",
  styleUrls: ["./answer.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AnswerComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  @Input()
  section: Section;

  @Input()
  question: Question;

  @Input()
  answer: Answer;

  @Output()
  onToggledAnswer: EventEmitter<Answer> = new EventEmitter<Answer>();

  isSelected: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  toggleAnswer() {
    this.isSelected = !this.isSelected;
    this.store.dispatch(
      new actions.StudentSelectedAnswer({
        sectionOrderNo: this.section.orderNo,
        questionOrderNo: this.question.orderNo,
        answerOrderNo: this.answer.orderNo,
        isSelected: this.isSelected
      })
    );
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
