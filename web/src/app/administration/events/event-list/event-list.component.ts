import { Component, OnInit } from '@angular/core';
import { EventInformation, EventContext } from 'src/app/event-page/event-page.model';
import { AdministrationService } from '../../administration.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  constructor(private administrationService: AdministrationService) { }

  dataSource: EventInformation[];

  displayedColumns: string[] = ['eventName', 'eventDate', 'location', 'action'];

  ngOnInit(): void {
    this.administrationService.listCurrentEvents().subscribe(res => {
      this.dataSource = res;
    });
  }

  view() {

  }

  delete(event: EventInformation) {
    const context: EventContext = {
      eventID: event.id
    };

    this.administrationService.deleteEvent(context).subscribe((res: any) => {
      if (res.succeeded) {
        this.dataSource = this.dataSource.filter(x => x.id !== event.id);
      }
    });
  }

  close(event: EventInformation) {
    const context: EventContext = {
      eventID: event.id
    };

    this.administrationService.closeEvent(context).subscribe((res: any) => {
      if (res.succeeded) {
        this.dataSource = this.dataSource.filter(x => x.id !== event.id);
      }
    });
  }

}
