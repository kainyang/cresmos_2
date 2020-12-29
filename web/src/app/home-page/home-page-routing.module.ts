import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page.component';

const routes: Routes = [
    {
        path: '', component: HomePageComponent,
        children: [
            { path: '', pathMatch: 'full', component: HomePageComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class HomePageRoutingModule { }
