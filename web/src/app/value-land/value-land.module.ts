import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { ValueLandRoutingModule, RoutedComponents } from './value-land-routing.module';
import { ProfileService } from '../profile/profile.service';
import { PurchaseDialogComponent } from './shared/purchase-dialog/purchase-dialog.component';

@NgModule({
    declarations: [
        RoutedComponents,
        PurchaseDialogComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ValueLandRoutingModule,
        SharedModule.forRoot(),
    ],
    providers: [
        ProfileService
    ]
})

export class ValueLandModule { }
