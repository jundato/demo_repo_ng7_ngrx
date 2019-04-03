import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { FuseSharedModule } from "@fuse/shared.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { store } from "./store";
import { ReviewerEffects } from "./store/effects";

const routes = [
  {
    path: "",
    loadChildren:
      "./list/student-reviewer-list.module#StudentReviewerListModule"
  },
  {
    path: "view",
    loadChildren:
      "./view/student-reviewer-view.module#StudentReviewerViewModule"
  },
  {
    path: "exam",
    loadChildren:
      "./exam/student-reviewer-exam.module#StudentReviewerExamModule"
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,

    StoreModule.forFeature(store.name, store.reviewerReducer),
    EffectsModule.forFeature([ReviewerEffects])
  ]
})
export class StudentReviewerModule {}
