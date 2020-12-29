import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { NavArea, URLTracker } from '../models/core.model';

@Injectable()
export class NavigationService {

    navArea: NavArea = NavArea.None;
    navAreaObservable$: Observable<NavArea>;
    urlTrackerObservable$: Observable<URLTracker>;

    private navAreaSubject: BehaviorSubject<NavArea>;
    private urlTrackerSubject: BehaviorSubject<URLTracker>;
    private currentUrl = '';

    constructor(private route: ActivatedRoute, private router: Router) { }

    emitNavArea() {
        this.navAreaSubject = new BehaviorSubject<NavArea>(this.getNavArea());
        this.navAreaObservable$ = this.navAreaSubject.asObservable();

        this.urlTrackerSubject = new BehaviorSubject<URLTracker>(<URLTracker>{ current: '', previous: '' });
        this.urlTrackerObservable$ = this.urlTrackerSubject.asObservable();

        this.router.events
            .pipe(
                filter((evt) => evt instanceof NavigationEnd)
            )
            .subscribe((evt: NavigationEnd) => {
                this.navAreaSubject.next(this.getNavArea());

                this.urlTrackerSubject.next(<URLTracker>{ previous: this.currentUrl, current: evt.url });
                this.currentUrl = evt.url;
            });
    }

    private getNavArea() {
        this.navArea = NavArea.None;
        let childRoute: ActivatedRouteSnapshot | null = this.route.snapshot;
        while (childRoute) {
            if (childRoute.data['navArea']) {
                this.navArea = childRoute.data['navArea'] as NavArea;
            }

            childRoute = childRoute.firstChild;
        }
        return this.navArea;
    }
}
