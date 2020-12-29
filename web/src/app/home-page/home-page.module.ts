import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CarouselModule } from 'angular-bootstrap-md';

import { SharedModule } from '../shared/shared.module';
import { HomePageComponent } from './home-page.component';
import { HomePageRoutingModule } from './home-page-routing.module';

@NgModule({
    declarations: [
        HomePageComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        HomePageRoutingModule,
        SharedModule.forRoot(),
        CarouselModule.forRoot(),
    ]
})

export class HomePageModule { }
