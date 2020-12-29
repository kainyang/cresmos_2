import { Injectable } from '@angular/core';
import { ApiHttpClient } from '../core/services/api-http-client';
import { EventInformation, EventContext, HistoricalEventInformation, UpdateEventPointsContext as BulkUpdateUserPointContext } from '../event-page/event-page.model';
import { Observable } from 'rxjs';
import { UserProfile } from '../profile/profile.model';

@Injectable()
export class AdministrationService {

    constructor(private httpClient: ApiHttpClient ) { }

    updateEvent(event: EventInformation) {
        return this.httpClient.post<EventInformation>('/Event/Update', event);
    }

    listCurrentEvents(): Observable<EventInformation[]> {
        return this.httpClient.unsecureGet<EventInformation[]>('/Event/ListAllEvents');
    }

    listHistoricalEvents(): Observable<HistoricalEventInformation[]> {
        return this.httpClient.unsecureGet<HistoricalEventInformation[]>('/Event/ListHistoricalEvents');
    }

    deleteEvent(context: EventContext): Observable<void> {
        return this.httpClient.post<void>('/Event/Delete', context);
    }

    closeEvent(context: EventContext): Observable<void> {
        return this.httpClient.post<void>('/Event/CloseEvent', context);
    }

    bulkUpdateUserPoints(context: BulkUpdateUserPointContext): Observable<void> {
        return this.httpClient.post<void>('/UserProfile/BulkUpdateUserPoints', context);
    }

    listUsersPointsNotAwardedByEventID(eventID: string) {
        return this.httpClient.get<UserProfile[]>('/UserProfile/ListUsersPointsNotAwardedByEventID', [{ key: 'eventID', value: eventID }]);
    }
}
