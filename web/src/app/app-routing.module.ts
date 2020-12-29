import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { ApplicationResolver } from './core/resolvers/application.resolver';

import { LayoutComponent } from './core/layout/layout.component';
import { AdminLayoutComponent } from './core/admin-layout/admin-layout.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { NavArea } from './core/models/core.model';
import { AdminLoginComponent } from './administration/login/login.component';
import { AdministratorGuard } from './auth/administrator.guard';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        resolve: { app: ApplicationResolver },
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'register', component: RegistrationComponent },
            { path: 'login', component: LoginComponent },
            { path: 'forget-password', component: ForgetPasswordComponent},
            { path: 'reset-password', component: ResetPasswordComponent},
            { path: 'confirmation', component: ConfirmationComponent },
            { path: 'home', loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule) },
            {
                path: 'profile',
                canActivate: [AuthGuard],
                data: { permittedRoles: ['Customer'] },
                children: [
                    {
                        path: '', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
                    }
                ]
            },
            { path: 'event', loadChildren: () => import('./event-page/event-page.module').then(m => m.EventPageModule) },
            { path: 'value-land', loadChildren: () => import('./value-land/value-land.module').then(m => m.ValueLandModule) },
        ]
    },
    {
        path: 'admin', component: AdminLayoutComponent,
        canActivate: [AdministratorGuard],
        data: { navArea: NavArea.Administrator, permittedRoles: ['Admin'] },
        resolve: { app: ApplicationResolver },
        children: [
            { path: '', loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule) },
        ]
    },
    {
        path: 'admin-login', component: AdminLoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule]
})

export class AppRoutingModule { }
