import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { FuseSharedModule } from "@fuse/shared.module";

const routes = [
  {
    path: "",
    loadChildren: "./home/student-home.module#StudentHomeModule"
  },
  {
    path: "reviewer",
    loadChildren: "./reviewer/student-reviewer.module#StudentReviewerModule"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), FuseSharedModule]
})
export class StudentModule { }
