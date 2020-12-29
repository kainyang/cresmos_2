import { Injectable } from '@angular/core';
import { ApiHttpClient } from '../core/services/api-http-client';
import { Observable } from 'rxjs';
import { UserEventBasic, EventInformation, RegisteredUserEvent, TeamEvent, EventInformationBasic, UserEvent } from './event-page.model';

@Injectable()
export class EventPageService {
    text: any;

    constructor(
        private httpClient: ApiHttpClient
    ) { }

    updateUserEvent(userEvent: UserEventBasic) {
        return this.httpClient.post<UserEventBasic>('/EventRegistration/UpdateUserEvent', userEvent);
    }

    updateTeamEvent(teamEvent: TeamEvent): Observable<string[]> {
        return this.httpClient.post<string[]>('/EventRegistration/UpdateTeamEvent', teamEvent);
    }

    validateTeamRegistration(teamEvent: TeamEvent): Observable<string[]> {
        return this.httpClient.post<string[]>('/EventRegistration/ValidateTeamRegistration', teamEvent);
    }

    isUserRegistered(eventID: string) {
        return this.httpClient.unsecureGet<boolean>('/EventRegistration/IsUserRegistered', [{ key: 'eventID', value: eventID }]);
    }

    listUserEvents() {
        return this.httpClient.unsecureGet<UserEventBasic[]>('/Event/ListUserEvents');
    }

    listUserEventsByEventID(eventID: string): Observable<UserEvent[]> {
        return this.httpClient.unsecureGet<UserEvent[]>('/EventRegistration/ListUserEventsByEventID', [{ key: 'eventID', value: eventID }]);
    }

    listTeamEventsByEventID(eventID: string): Observable<TeamEvent[]> {
        return this.httpClient.unsecureGet<TeamEvent[]>('/EventRegistration/ListTeamEventsByEventID', [{ key: 'eventID', value: eventID }]);
    }

    checkRegisteredUsers(registeredUserEvent: RegisteredUserEvent): Observable<void> {
        return this.httpClient.unsecurePost<void>('/EventRegistration/CheckRegisteredUsers', registeredUserEvent);
    }

    checkTeamEventName(teamEvent: TeamEvent):  Observable<boolean> {
        return this.httpClient.post('/EventRegistration/CheckTeamEventName', teamEvent);
    }

    getEventByID(eventID: string): Observable<EventInformation> {
        return this.httpClient.unsecureGet<EventInformation>('/Event/GetEvent', [{ key: 'eventID', value: eventID }]);
    }

    listCurrentEvents(): Observable<EventInformation[]> {
        return this.httpClient.unsecureGet<EventInformation[]>('/Event/ListAllEvents');
    }

    listCurrentEventsBasic(): Observable<EventInformationBasic[]> {
        return this.httpClient.unsecureGet<EventInformationBasic[]>('/Event/ListAllEventsBasic');
    }
}
