import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../../administration.service';
import { HistoricalEventInformation } from 'src/app/event-page/event-page.model';

@Component({
  selector: 'app-historical-event-list',
  templateUrl: './historical-event-list.component.html',
  styleUrls: ['./historical-event-list.component.scss']
})
export class HistoricalEventListComponent implements OnInit {

  dataSource: HistoricalEventInformation[];

  displayedColumns: string[] = ['eventName', 'eventDate', 'location', 'action'];

  constructor(private administrationService: AdministrationService) { }

  ngOnInit(): void {
    this.administrationService.listHistoricalEvents().subscribe(res => {
      this.dataSource = res;
    });
  }

}
