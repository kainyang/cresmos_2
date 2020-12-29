import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NavLink } from '../../tertiary-nav/tertiary-nav.model';

@Component({
    templateUrl: './admin-two-column-menu.component.html',
    styleUrls: ['./admin-two-column-menu.component.scss'],
})
export class AdminTwoColumnMenuComponent implements OnInit {

    navLinks: NavLink[];

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.navLinks = data['navLinks'];
        });
    }
}
