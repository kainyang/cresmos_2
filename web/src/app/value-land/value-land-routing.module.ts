import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavLink } from '../shared/component/tertiary-nav/tertiary-nav.model';
import { TwoColumnMenuComponent } from '../shared/component/template/two-column-menu/two-column-menu.component';
import { ShoppingListComponent } from './shared/shopping-list/shopping-list.component';

import { ValueLandIconComponent } from './icon/value-land-icon.component';
import { ValueLandComponent } from './value-land.component';


const routes: Routes = [
    {
        path: '', component: TwoColumnMenuComponent,
        data: {
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
            { path: 'icon', component: ValueLandComponent },
            { path: 'borders', component: ValueLandComponent },
            { path: 'loots', component: ValueLandComponent },
            { path: 'collectible', component: ValueLandComponent },
            { path: 'accessories', component: ValueLandComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class ValueLandRoutingModule { }

export const RoutedComponents = [
    ValueLandIconComponent,
    ShoppingListComponent,
];
