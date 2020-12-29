import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/profile/profile.service';
import { UserProfile } from 'src/app/profile/profile.model';
import { EventInformationBasic, UpdateEventPointsContext, TransactionType } from 'src/app/event-page/event-page.model';
import { EventPageService } from 'src/app/event-page/event-page.service';
import { SelectionModel } from '@angular/cdk/collections';
import { AdministrationService } from '../../administration.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  eventList: EventInformationBasic[];
  selectedEventID: string;
  pointsUpdated = false;

  displayedColumns: string[] = ['userName', 'firstName', 'lastName', 'email', 'select'];
  selection = new SelectionModel<UserProfile>(true, []);
  dataSource: UserProfile[];

  constructor(private eventPageService: EventPageService,
    private administrationService: AdministrationService) { }

  ngOnInit(): void {
    this.eventPageService.listCurrentEventsBasic().subscribe(res => {
      if (res) {
        this.eventList = res;
      }
    });
  }

  onEventSelect() {
    this.administrationService.listUsersPointsNotAwardedByEventID(this.selectedEventID).subscribe(res => {
      if (res) {
        this.dataSource = res;
      }
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.forEach(row => this.selection.select(row));
  }

  award() {
    const updateContext: UpdateEventPointsContext = {
      usersID: this.selection.selected.map(x => x.id),
      eventID: this.selectedEventID,
      amount: this.eventList.find(event => event.id === this.selectedEventID).points,
      transactionType: TransactionType.Credit
    };

    this.administrationService.bulkUpdateUserPoints(updateContext).subscribe((res: any) => {
      if (res.succeeded) {
        this.pointsUpdated = true;
        this.dataSource = this.dataSource.filter(x => !updateContext.usersID.includes(x.id));
      }
    });
  }
}
