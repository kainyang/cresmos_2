import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './core/layout/layout.module';
import { AdminLayoutModule } from './core/admin-layout/admin-layout.module';
import { EventPageModule } from './event-page/event-page.module';

import { CoreService } from './core/services/core.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ApplicationResolver } from './core/resolvers/application.resolver';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ErrorComponent } from './error/error.component';
import { HistoricalEventListComponent } from './administration/events/historical-event-list/historical-event-list.component';
import { HistoricalUserListComponent } from './administration/users/historical-user-list/historical-user-list.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ConfirmationComponent,
    ErrorComponent,
    HistoricalEventListComponent,
    HistoricalUserListComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    LayoutModule,
    AdminLayoutModule,
    BrowserAnimationsModule,
    EventPageModule,
    MDBBootstrapModule.forRoot(),
    NgbModule,
  ],
  providers: [
    CoreService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    ApplicationResolver],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
