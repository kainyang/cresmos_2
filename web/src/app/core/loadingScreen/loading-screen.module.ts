import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { LoadingScreenComponent } from './loading-screen.component';
import { LoadingScreenService } from './loading-screen.service';

@NgModule({
    declarations: [
        LoadingScreenComponent
    ],
    entryComponents: [
        LoadingScreenComponent
    ],
    imports: [
        CommonModule, SharedModule.forRoot()
    ],
    providers: [
        LoadingScreenService
    ]
})
export class LoadingScreenModule { }
