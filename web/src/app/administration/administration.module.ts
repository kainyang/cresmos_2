import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { AdministrationRoutingModule, RoutedComponents } from './administration-routing.module';
import { CreateFormComponent } from './events/create-form/create-form.component';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { AdminLoginComponent } from './login/login.component';
import { AdministrationService } from './administration.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        RoutedComponents,
        CreateFormComponent,
        CreateEventComponent,
        EventListComponent,
        EventDetailsComponent,
        UserDetailsComponent,
        UserListComponent,
        AdminLoginComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        AdministrationRoutingModule,
        SharedModule.forRoot(),
        NgbModule,
    ],
    providers: [
        AdministrationService
    ]
})

export class AdministrationModule { }
