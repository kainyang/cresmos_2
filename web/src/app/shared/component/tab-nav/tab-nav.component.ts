import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { NavigationService } from '../../../core/services/navigation.service';
import { NavArea, TabNavLink, URLTracker } from '../../../core/models/core.model';

@Component({
    selector: 'app-tab-nav',
    templateUrl: './tab-nav.component.html',
    styleUrls: ['./tab-nav.component.scss']
})
export class TabNavComponent implements OnInit, OnDestroy {
    @Input() navAreaOverride = false;

    tabNavLinks: TabNavLink[];

    private subscriptions: Subscription[] = [];
    private urlReferrer: string;

    constructor(
        private navigationService: NavigationService,
        private route: Router,
        private location: Location
    ) { }

    ngOnInit() {

        this.subscriptions.push(this.navigationService.urlTrackerObservable$.subscribe((urlTracker: URLTracker) => {
            if (this.navAreaOverride) {
                const hasChangedRoutingNavArea = urlTracker.previous.split('/')[1] !== urlTracker.current.split('/')[1];

                if (!this.urlReferrer || hasChangedRoutingNavArea) {
                    this.urlReferrer = urlTracker.previous;
                }
            } else {
                this.urlReferrer = urlTracker.previous;
            }
        }));

        this.subscriptions.push(this.navigationService.navAreaObservable$.subscribe(navArea => {
            this.refreshSubNav(navArea);
        }));
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    back() {
        if (this.urlReferrer) {
            this.route.navigate([this.urlReferrer]);
        } else {
            this.location.back();
        }
    }

    private refreshSubNav(navArea: string) {
        this.tabNavLinks = [];

        switch (navArea) {
            case NavArea.Profile:
                this.configureProfileLinks();
                return;

            case NavArea.Administrator:
                this.configureAdministratorLinks();
                return;

            case NavArea.None:
            default:
                this.tabNavLinks = [];
                return;
        }
    }

    private configureProfileLinks() {
        this.tabNavLinks = [
            new TabNavLink('Dashboard', '/profile/dashboard'),
            new TabNavLink('Vault', '/profile/vault'),
            new TabNavLink('Activity', '/profile/activity'),
            new TabNavLink('Inbox', '/profile/inbox'),
            new TabNavLink('Settings', '/profile/settings'),
        ];
    }

    private configureAdministratorLinks() {
        this.tabNavLinks = [
            new TabNavLink('Events', '/admin/events'),
            new TabNavLink('Users', '/admin/users'),
        ];
    }
}
