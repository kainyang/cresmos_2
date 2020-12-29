import { Component, Input, EventEmitter, OnInit } from '@angular/core';
import { InboxItem, MessageType } from '../../profile.model';
import { EventPageService } from 'src/app/event-page/event-page.service';
import { UserEventBasic } from 'src/app/event-page/event-page.model';
import { ValidationMessage } from 'src/app/core/models/core.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-inbox-overlay',
    templateUrl: './inbox-overlay.component.html',
    styleUrls: ['./inbox-overlay.component.scss']
})

export class InboxOverlayComponent implements OnInit {

    @Input() inboxItem: InboxItem;

    close: EventEmitter<void>;

    validationMessages: ValidationMessage[];
    isEventRegistration = false;

    constructor(private eventPageService: EventPageService,
        private router: Router) { }

    ngOnInit() {
        if (this.inboxItem.messageType === MessageType.EventRegistration) {
            this.isEventRegistration = true;
        }
    }

    onRegister() {
        this.validationMessages = [];

        const userEvent: UserEventBasic = {
            eventID: this.inboxItem.eventID,
            eventName: this.inboxItem.messageTitle
        };

        this.eventPageService.updateUserEvent(userEvent).subscribe((res: any) => {
            if (res.succeeded) {
                this.navigateToActivity();
            }
        });
    }

    closeOverlay() {
        this.close.emit();
    }

    private navigateToActivity() {
        this.router.navigate(['/profile/activity']);
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
