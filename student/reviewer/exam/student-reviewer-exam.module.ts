import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { FuseSharedModule } from "@fuse/shared.module";
import { StudentReviewerExamComponent } from "./exam.component";
import {
  MatIconModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatDividerModule,
  MatSelectModule,
  MatOptionModule,
  MatTabsModule,
  MatProgressBarModule
} from "@angular/material";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { ExamEffects } from "./store/effects";

import { store } from "./store";
import { FuseSidebarModule } from "@fuse/components";
import { SectionComponent } from "./section/section.component";
import { QuestionComponent } from "./question/question.component";
import { AnswerComponent } from "./answer/answer.component";
import { TimerCountdownComponent } from "./timer-countdown/timer-countdown.component";

const routes = [
  {
    path: ":id",
    component: StudentReviewerExamComponent
  }
];

@NgModule({
  declarations: [
    QuestionComponent,
    StudentReviewerExamComponent,
    SectionComponent,
    AnswerComponent,
    TimerCountdownComponent
  ],
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatOptionModule,
    MatTabsModule,

    RouterModule.forChild(routes),
    FuseSharedModule,

    StoreModule.forFeature(store.name, store.examReducer),
    EffectsModule.forFeature([ExamEffects]),

    FuseSidebarModule
  ],
  exports: [StudentReviewerExamComponent]
})
export class StudentReviewerExamModule {}
