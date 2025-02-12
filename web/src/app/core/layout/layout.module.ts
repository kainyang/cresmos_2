﻿import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { LayoutComponent } from './layout.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

@NgModule({
    declarations: [
        LayoutComponent,
        HeaderMenuComponent,
        NavMenuComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        SharedModule.forRoot()
    ]
})
export class LayoutModule { }
