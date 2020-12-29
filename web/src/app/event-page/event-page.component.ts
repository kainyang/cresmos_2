import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EventInformation, EventType, ParticipationType } from './event-page.model';
import { OverlayService } from '../shared/component/overlay/overlay.service';
import { EventOverlayComponent } from './event-overlay/event-overlay.component';
import { EventPageService } from './event-page.service';
import { LoadingScreenService } from '../core/loadingScreen/loading-screen.service';
import { WindowService } from '../core/services/window.service';


@Component({
    selector: 'app-event-page',
    templateUrl: './event-page.component.html',
    styleUrls: ['./event-page.component.scss']
})

export class EventPageComponent implements OnInit {

    eventList: EventInformation[] = [];

    isMobileDevice: boolean;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private overlayService: OverlayService,
        private eventPageService: EventPageService,
        private loadingScreenService: LoadingScreenService,
        private windowService: WindowService) { }

    ngOnInit() {
        this.isMobileDevice = this.windowService.isMobileDevice();

        this.loadingScreenService.show();
        this.eventPageService.listCurrentEvents().subscribe(res => {
            if (res) {
                res.forEach(x => {
                    this.eventList.push(x);
                });
                this.loadingScreenService.hide();
            }
        });
    }

    openOverlay(eventInformation: EventInformation) {
        // this.overlayService.open(EventOverlayComponent, { 'eventInformation': eventInformation });

        this.router.navigate(['/event/details'], { relativeTo: this.route, queryParams: { eventID: eventInformation.id } });
    }

    getEventTypeIcon(eventType: EventType): string {
        switch (eventType) {
            case EventType.Tournament:
                return 'trophy';
            case EventType.Internship:
                return 'briefcase';
            default:
                break;
        }
    }

    getEventTypeText(eventType: EventType): string {
        switch (eventType) {
            case EventType.Tournament:
                return 'Tournament';
            case EventType.Internship:
                return 'Internship';
            default:
                break;
        }
    }

    getParticipationTypeText(participationType: ParticipationType): string {
        switch (participationType) {
            case ParticipationType.Single:
                return 'Single';
            case ParticipationType.Group:
                return 'Group';
            default:
                break;
        }
    }
}
