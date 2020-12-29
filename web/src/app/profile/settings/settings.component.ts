import { Component, OnInit } from '@angular/core';
import { NavLink } from 'src/app/shared/component/tertiary-nav/tertiary-nav.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-settings',
    templateUrl: 'settings.component.html',
    styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {

    navLinks: NavLink[];

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.navLinks = data['navLinks'];
        });
    }
}
