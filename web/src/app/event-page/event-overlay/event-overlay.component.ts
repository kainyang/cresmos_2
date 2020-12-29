import { Component, Input, EventEmitter, OnInit } from '@angular/core';
import { EventInformation, UserEventBasic, ParticipationType } from '../event-page.model';
import { Router, ActivatedRoute } from '@angular/router';
import { EventPageService } from '../event-page.service';
import { CoreService } from 'src/app/core/services/core.service';
import { ValidationMessage } from 'src/app/core/models/core.model';

@Component({
    selector: 'app-event-overlay',
    templateUrl: './event-overlay.component.html',
    styleUrls: ['./event-overlay.component.scss']
})

export class EventOverlayComponent implements OnInit {

    @Input() eventInformation: EventInformation;

    close: EventEmitter<void>;
    validationMessages: ValidationMessage[];
    isRegistered: boolean;

    private userEvent: UserEventBasic;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private coreService: CoreService,
        private eventPageService: EventPageService) { }

    ngOnInit() {
        this.validationMessages = [];

        this.userEvent = {
            eventID: this.eventInformation.id,
            eventName: this.eventInformation.eventName
        };

        this.eventPageService.isUserRegistered(this.userEvent.eventID).subscribe(registered => {
            if (registered) {
                this.isRegistered = registered;
                this.setValidationMessage('You are already registered with this event.');
            }
        });
    }

    closeOverlay() {
        this.close.emit();
    }

    register() {
        if (this.eventInformation.participationType === ParticipationType.Single) {
            this.registerSingleEvent();
        } else {
            this.registerTeamEvent();
        }
    }

    showPayButton() {
        return this.eventInformation.isPaidEvent && this.eventInformation.participationType === ParticipationType.Single;
    }

    private navigateToActivity() {
        this.router.navigate(['/profile/activity']);
        this.closeOverlay();
    }

    private navigateToLogin() {
        this.router.navigate(['/login']);
        this.closeOverlay();
    }

    private registerSingleEvent() {
        if (this.coreService.isUserLoggedIn()) {
            this.eventPageService.updateUserEvent(this.userEvent).subscribe((res: any) => {
                if (res.succeeded) {
                    this.navigateToActivity();
                }
            });
        } else {
            this.navigateToLogin();
        }
    }

    private registerTeamEvent() {
        this.router.navigate(['/event/registration'], { relativeTo: this.route, queryParams: { eventID: this.eventInformation.id } });
        this.closeOverlay();
    }

    private setValidationMessage(message: string) {
        const errorMessage: ValidationMessage = {
            message: message,
            property: '',
            replacements: null
        };

        if (this.validationMessages === [] || !this.validationMessages.find(x => x.message === message)) {
            this.validationMessages.push(errorMessage);
        }
    }
}
