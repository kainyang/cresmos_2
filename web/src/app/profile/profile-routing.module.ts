import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavArea } from '../core/models/core.model';

import { NavLink } from '../shared/component/tertiary-nav/tertiary-nav.model';
import { TwoColumnMenuComponent } from '../shared/component/template/two-column-menu/two-column-menu.component';
import { FullWidthComponent } from '../shared/component/template/full-width/full-width.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { SettingsComponent } from './settings/settings.component';
import { GeneralSettingsComponent } from './settings/general/general-settings.component';
import { SecuritySettingsComponent } from './settings/security/security-settings.component';

import { VaultIconComponent } from './vault/icon/vault-icon.component';
import { InventoryListComponent } from './vault/shared/inventory/inventory-list.component';
import { VaultBordersComponent } from './vault/borders/vault-borders.component';
import { VaultComponent } from './vault/vault.component';

import { ActivityComponent } from './activity/activity.component';
import { InboxComponent } from './inbox/inbox.component';
import { InboxOverlayComponent } from './inbox/inbox-overlay/inbox-overlay.component';

const routes: Routes = [
    {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
    },
    {
        path: 'dashboard', component: FullWidthComponent,
        data: { navArea: NavArea.Profile },
        children: [
            { path: '', redirectTo: 'details', pathMatch: 'full' },
            { path: 'details', component: DashboardComponent },
        ]
    },
    {
        path: 'vault', component: TwoColumnMenuComponent,
        data: {
            navArea: NavArea.Profile,
            navLinks: <NavLink[]>[
                new NavLink('Icon', 'icon'),
                new NavLink('Borders', 'borders'),
                new NavLink('Loot Boxes', 'loots'),
                new NavLink('Game Collectible', 'collectible'),
                new NavLink('Accessories', 'accessories'),
            ]
        },
        children: [
            { path: '', redirectTo: 'icon', pathMatch: 'full' },
            { path: 'icon', component: VaultIconComponent },
            { path: 'borders', component: VaultBordersComponent },
            { path: 'loots', component: VaultComponent },
            { path: 'collectible', component: VaultComponent },
            { path: 'accessories', component: VaultComponent },
        ]
    },
    {
        path: 'activity', component: FullWidthComponent,
        data: { navArea: NavArea.Profile },
        children: [
            { path: '', redirectTo: 'details', pathMatch: 'full' },
            { path: 'details', component: ActivityComponent },
        ]
    },
    {
        path: 'inbox', component: FullWidthComponent,
        data: { navArea: NavArea.Profile },
        children: [
            { path: '', redirectTo: 'details', pathMatch: 'full' },
            { path: 'details', component: InboxComponent },
        ]
    },
    {
        path: 'settings', component: TwoColumnMenuComponent,
        data: {
            navArea: NavArea.Profile,
            navLinks: <NavLink[]>[
                new NavLink('General', 'general'),
                new NavLink('Security', 'security'),
            ]
        },
        children: [
            { path: '', redirectTo: 'general', pathMatch: 'full' },
            { path: 'general', component: GeneralSettingsComponent },
            { path: 'security', component: SecuritySettingsComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class ProfileRoutingModule { }

export const RoutedComponents = [
    DashboardComponent,
    SettingsComponent,
    GeneralSettingsComponent,
    SecuritySettingsComponent,
    VaultIconComponent,
    VaultBordersComponent,
    InventoryListComponent,
    ActivityComponent,
    InboxComponent,
    InboxOverlayComponent,
];
