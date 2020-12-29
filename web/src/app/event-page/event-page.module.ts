import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { EventOverlayComponent } from './event-overlay/event-overlay.component';
import { EventPageRoutingModule, RoutedComponents } from './event-page-routing.module';
import { EventPageService } from './event-page.service';
import { EventDetailsComponent } from './event-details/event-details.component';
import { ParticipantsComponent } from './event-details/participants/participants.component';
import { BracketComponent } from './event-details/bracket/bracket.component';
import { PrizesComponent } from './event-details/prizes/prizes.component';
import { ScheduleComponent } from './event-details/schedule/schedule.component';
import { ContactComponent } from './event-details/contact/contact.component';
import { AnnouncementsComponent } from './event-details/announcements/announcements.component';
import { PaymentComponent } from './event-details/payment/payment.component';

@NgModule({
    declarations: [
        RoutedComponents,
        EventDetailsComponent,
        ParticipantsComponent,
        BracketComponent,
        PrizesComponent,
        ScheduleComponent,
        ContactComponent,
        AnnouncementsComponent,
        PaymentComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        EventPageRoutingModule,
        SharedModule.forRoot(),
    ],
    providers: [
        EventPageService,
    ],
    entryComponents: [
        EventOverlayComponent,
    ]
})

export class EventPageModule { }
