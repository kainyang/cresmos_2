import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavArea } from '../core/models/core.model';

import { NavLink } from '../shared/component/tertiary-nav/tertiary-nav.model';
import { AdminTwoColumnMenuComponent } from '../shared/component/template/admin-two-column-menu/admin-two-column-menu.component';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { HistoricalEventListComponent } from './events/historical-event-list/historical-event-list.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { HistoricalUserListComponent } from './users/historical-user-list/historical-user-list.component';

const routes: Routes = [
    {
        path: '', redirectTo: 'events', pathMatch: 'full'
    },
    {
        path: 'events', component: AdminTwoColumnMenuComponent,
        data: {
            navLinks: <NavLink[]>[
                new NavLink('Create Events', 'create-event'),
                new NavLink('List Events', 'list-events'),
                new NavLink('List Historical Events', 'list-historical-events'),
            ]
        },
        children: [
            { path: '', redirectTo: 'create-event' },
            { path: 'create-event', component: CreateEventComponent },
            { path: 'list-events', component: EventListComponent },
            { path: 'list-historical-events', component: HistoricalEventListComponent },
        ]
    },
    {
        path: 'users', component: AdminTwoColumnMenuComponent,
        data: {
            navLinks: <NavLink[]>[
                // new NavLink('Award Points', 'award-points'),
                new NavLink('List Users - Current Events', 'list-users'),
                new NavLink('List Users - Historical Events', 'list-historical-users'),
            ]
        },
        children: [
            { path: '', redirectTo: 'list-users'},
            { path: 'list-users', component: UserListComponent },
            { path: 'list-historical-users', component: HistoricalUserListComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class AdministrationRoutingModule { }

export const RoutedComponents = [
    CreateEventComponent,
];
