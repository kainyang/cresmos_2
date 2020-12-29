import { Component, OnInit } from '@angular/core';
import { InboxItem, MessageType } from '../profile.model';
import { OverlayService } from 'src/app/shared/component/overlay/overlay.service';
import { InboxOverlayComponent } from './inbox-overlay/inbox-overlay.component';
import { ProfileService } from '../profile.service';
import { WindowService } from 'src/app/core/services/window.service';

@Component({
    selector: 'app-inbox',
    templateUrl: 'inbox.component.html',
    styleUrls: ['./inbox.component.scss']
})

export class InboxComponent implements OnInit {

    isMobileDevice = false;

    constructor(
        private overlayService: OverlayService,
        private windowService: WindowService,
        private profileService: ProfileService) { }

    inboxList: InboxItem[];

    displayedColumns: string[] = ['messageTitle', 'messageType', 'messageDate', 'sender', 'status', 'action'];

    ngOnInit() {
        this.isMobileDevice = this.windowService.isMobileDevice();

        this.profileService.listInboxItems().subscribe(res => {
            this.inboxList = res;
        });
    }

    getActivityType(messageType: MessageType) {
        switch (messageType) {
            case 1:
                return 'System';
            case 2:
                return 'Event Registration';
            default:
                break;
        }
    }

    getMessageStatus(status: boolean): string {
        if (status) {
            return 'Read';
        } else {
            return 'New';
        }
    }

    viewMessage(message: InboxItem) {
        this.overlayService.open(InboxOverlayComponent, { 'inboxItem': message });
    }

    deleteMessage(message: InboxItem) {

    }
}
