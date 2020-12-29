import { Component, Input, OnInit } from '@angular/core';
import { WindowService } from 'src/app/core/services/window.service';

import { NavLink } from '../../../shared/component/tertiary-nav/tertiary-nav.model';

@Component({
    selector: 'app-nav-list',
    templateUrl: './nav-list.component.html',
    styleUrls: ['./nav-list.component.scss']
})
export class NavListComponent implements OnInit {
    @Input() navLinks: NavLink[];

    isMobileDevice: boolean;

    constructor(private windowService: WindowService) { }

    ngOnInit() {
        this.isMobileDevice = this.windowService.isMobileDevice();
    }
}
