import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent implements OnInit {

  constructor(private navigationService: NavigationService) {}

  ngOnInit() {
    this.navigationService.emitNavArea();
  }
}
