import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { HomeComponent } from './home.component';
import { MatOptionModule, MatFormFieldModule, MatSelectModule, MatIconModule, MatInputModule } from '@angular/material';

const routes = [
    {
        path: '',
        component: HomeComponent,
    }
];

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule,
        
        MatInputModule,
        MatOptionModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule
    ]
})
export class StudentHomeModule {
}
