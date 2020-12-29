import { Injectable } from '@angular/core';
import { ApiHttpClient } from '../core/services/api-http-client';
import { UserProfile, InboxItem, Activity, UserItem, ResetPasswordModel, UserDashboard } from './profile.model';
import { Observable } from 'rxjs';
import { Item } from '../value-land/value-land.model';

@Injectable()
export class ProfileService {

    constructor(private httpClient: ApiHttpClient) { }

    getUserProfile(): Observable<UserProfile> {
        return this.httpClient.get<UserProfile>('/UserProfile/GetUserProfile');
    }

    getUserInventory(): Observable<UserItem> {
        return this.httpClient.get<UserItem>('/UserProfile/GetUserInventory');
    }

    getUserDashboard(): Observable<UserDashboard> {
        return this.httpClient.get<UserDashboard>('/UserProfile/GetUserDashboard');
    }

    listInboxItems(): Observable<InboxItem[]> {
        return this.httpClient.get<InboxItem[]>('/Notification/ListInboxItems');
    }

    listUserActivities(): Observable<Activity[]> {
        return this.httpClient.get<Activity[]>('/UserProfile/ListUserActivities');
    }

    listUsersProfileByEventID(eventID: string): Observable<UserProfile[]> {
        return this.httpClient.get<UserProfile[]>('/UserProfile/ListUsersByEventID', [{ key: 'eventID', value: eventID }]);
    }

    updateUserProfile(userProfile: UserProfile): Observable<void> {
        return this.httpClient.post<void>('/UserProfile/Update', userProfile);
    }

    updateInboxItem(inboxItem: InboxItem): Observable<void> {
        return this.httpClient.post<void>('/Notification/Update', inboxItem);
    }

    updateUserInventory(item: Item): Observable<void> {
        return this.httpClient.post<void>('/UserProfile/UpdateUserInventory', item);
    }

    resetPassword(resetPasswordModel: ResetPasswordModel): Observable<void> {
        return this.httpClient.post<void>('/UserProfile/ResetPassword', resetPasswordModel);
    }
}
