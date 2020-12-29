import { Component, Input } from '@angular/core';

import { NavLink } from './tertiary-nav.model';

@Component({
    selector: 'app-tertiary-nav',
    templateUrl: './tertiary-nav.component.html',
    styleUrls: ['./tertiary-nav.component.scss']
})
export class TertiaryNavComponent {
    @Input() tertiaryNavLinks: NavLink[];
}
