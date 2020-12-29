import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WindowService } from 'src/app/core/services/window.service';

import { NavLink } from '../../tertiary-nav/tertiary-nav.model';

@Component({
    templateUrl: './two-column-menu.component.html',
    styleUrls: ['./two-column-menu.component.scss'],
})
export class TwoColumnMenuComponent implements OnInit {

    navLinks: NavLink[];
    isMobileDevice: boolean;
    showBackLink = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private windowService: WindowService) {
    }

    ngOnInit() {
        this.isMobileDevice = this.windowService.isMobileDevice();

        this.route.data.subscribe(data => {
            this.navLinks = data['navLinks'];
            this.showBackLink = data['showBackLink'];
        });
    }

    back() {
        this.router.navigate(['/event']);
    }
}
