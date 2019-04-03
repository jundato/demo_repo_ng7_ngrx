import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { FuseSharedModule } from "@fuse/shared.module";
import { StudentReviewerViewComponent } from "./view.component";
import {
  MatIconModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule
} from "@angular/material";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { ViewEffects } from "./store/effects";

import { store } from "./store";
import { FuseSidebarModule } from "@fuse/components";

const routes = [
  {
    path: ":id",
    component: StudentReviewerViewComponent
  }
];

@NgModule({
  declarations: [StudentReviewerViewComponent],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatProgressSpinnerModule,

    RouterModule.forChild(routes),
    FuseSharedModule,

    StoreModule.forFeature(store.name, store.viewReducer),
    EffectsModule.forFeature([ViewEffects]),

    FuseSidebarModule
  ],
  exports: [StudentReviewerViewComponent]
})
export class StudentReviewerViewModule {}
