import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { AdminLayoutComponent } from './admin-layout.component';

@NgModule({
    declarations: [
        AdminLayoutComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        SharedModule.forRoot()
    ]
})
export class AdminLayoutModule { }
