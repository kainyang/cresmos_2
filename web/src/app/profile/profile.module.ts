import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule, RoutedComponents } from './profile-routing.module';
import { ProfileService } from './profile.service';
import { InboxOverlayComponent } from './inbox/inbox-overlay/inbox-overlay.component';

@NgModule({
    declarations: [
        RoutedComponents,
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ProfileRoutingModule,
        SharedModule.forRoot(),
    ],
    providers: [
        ProfileService,
    ],
    entryComponents: [
        InboxOverlayComponent,
    ]
})

export class ProfileModule { }
