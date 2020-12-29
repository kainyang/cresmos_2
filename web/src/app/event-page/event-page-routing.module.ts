import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventPageComponent } from './event-page.component';
import { EventOverlayComponent } from './event-overlay/event-overlay.component';
import { EventRegistrationComponent } from './registration/event-registration.component';
import { AuthGuard } from '../auth/auth.guard';
import { TwoColumnMenuComponent } from '../shared/component/template/two-column-menu/two-column-menu.component';
import { NavLink } from '../shared/component/tertiary-nav/tertiary-nav.model';

import { ParticipantsComponent } from './event-details/participants/participants.component';
import { BracketComponent } from './event-details/bracket/bracket.component';
import { PrizesComponent } from './event-details/prizes/prizes.component';
import { ScheduleComponent } from './event-details/schedule/schedule.component';
import { ContactComponent } from './event-details/contact/contact.component';
import { AnnouncementsComponent } from './event-details/announcements/announcements.component';
import { PaymentComponent } from './event-details/payment/payment.component';
import { EventDetailsComponent } from './event-details/event-details.component';

const routes: Routes = [
    { path: '', component: EventPageComponent },
    { path: 'details', component: EventDetailsComponent },
    // {
    //     path: 'details', component: TwoColumnMenuComponent,
    //     data: {
    //         navLinks: <NavLink[]>[
    //             new NavLink('Participants', 'participants'),
    //             new NavLink('Bracket', 'bracket'),
    //             new NavLink('Prizes', 'prizes'),
    //             new NavLink('Schedule', 'schedule'),
    //             new NavLink('Contact us', 'contact'),
    //             new NavLink('Announcements', 'announcements'),
    //             new NavLink('Payment', 'payment'),
    //         ],
    //         showBackLink: true,
    //     },
    //     children: [
    //         { path: '', redirectTo: 'participants', pathMatch: 'full' },
    //         { path: 'participants', component: ParticipantsComponent },
    //         { path: 'bracket', component: BracketComponent },
    //         { path: 'prizes', component: PrizesComponent },
    //         { path: 'schedule', component: ScheduleComponent },
    //         { path: 'contact', component: ContactComponent },
    //         { path: 'announcements', component: AnnouncementsComponent },
    //         { path: 'payment', component: PaymentComponent },
    //     ]
    // },
    { path: 'registration', pathMatch: 'full', component: EventRegistrationComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class EventPageRoutingModule { }

export const RoutedComponents = [
    EventPageComponent,
    EventOverlayComponent,
    EventRegistrationComponent,
];
