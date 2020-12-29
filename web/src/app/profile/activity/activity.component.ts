import { Component, OnInit } from '@angular/core';
import { Activity, ActivityType } from '../profile.model';
import { ProfileService } from '../profile.service';

@Component({
    selector: 'app-activity',
    templateUrl: 'activity.component.html',
    styleUrls: ['./activity.component.scss']
})

export class ActivityComponent implements OnInit {

    constructor(private profileService: ProfileService) { }

    activityList: Activity[];

    displayedColumns: string[] = ['name', 'type', 'registrationDate'];

    ngOnInit() {
        this.profileService.listUserActivities().subscribe(res => {
            this.activityList = res;
        });
    }

    getActivityType(activityType: ActivityType) {
        switch (activityType) {
            case 1:
                return 'Event';
            case 2:
                return 'Internship';
            default:
                break;
        }
    }
}
