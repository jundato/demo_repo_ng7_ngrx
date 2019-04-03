import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentReviewerListComponent } from './list.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatProgressSpinnerModule, MatCardModule, MatTableModule, MatListModule, MatSelectModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ListEffects } from './store/effects';
import { store } from './store';

const routes = [
    {
        path: '',
        component: StudentReviewerListComponent
    }
];

@NgModule({
    declarations: [
        StudentReviewerListComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule,

        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatTableModule,
        ReactiveFormsModule,
        FlexLayoutModule,

        StoreModule.forFeature(store.name, store.listReducer),
        EffectsModule.forFeature([ListEffects])
    ],
    exports: [
        StudentReviewerListComponent
    ]
})
export class StudentReviewerListModule { }
