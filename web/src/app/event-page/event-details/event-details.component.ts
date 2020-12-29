import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationMessage } from 'src/app/core/models/core.model';
import { CoreService } from 'src/app/core/services/core.service';
import { EventInformation, ParticipationType, TeamEvent, UserEvent, UserEventBasic } from '../event-page.model';
import { EventPageService } from '../event-page.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  isRegistered: boolean;
  validationMessages: ValidationMessage[];

  eventInformation: EventInformation;
  teamEvents: TeamEvent[];

  private userEvent: UserEventBasic;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coreService: CoreService,
    private eventPageService: EventPageService) { }

  ngOnInit(): void {
    const eventID = this.route.snapshot.queryParams.eventID;

    this.validationMessages = [];

    this.eventPageService.getEventByID(eventID).subscribe((res: EventInformation) => {
      if (res) {
        this.eventInformation = res;

        this.userEvent = {
          eventID: res.id,
          eventName: res.eventName
        };
      }
    });

    this.eventPageService.listTeamEventsByEventID(eventID).subscribe((res: TeamEvent[]) => {
      if (res) {
        this.teamEvents = res;
      }
    });

    if (this.coreService.isUserLoggedIn()) {
      this.eventPageService.isUserRegistered(eventID).subscribe(registered => {
        if (registered) {
          this.isRegistered = registered;
          this.setValidationMessage('You are already registered with this event.');
        }
      });
    }
  }

  back() {
    this.router.navigate(['/event']);
  }

  register() {
    if (this.eventInformation.participationType === ParticipationType.Single) {
      this.registerSingleEvent();
    } else {
      this.registerTeamEvent();
    }
  }

  private navigateToActivity() {
    this.router.navigate(['/profile/activity']);
  }

  private navigateToLogin() {
    this.router.navigate(['/login']);
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
