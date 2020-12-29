import { Component, OnInit } from '@angular/core';
import { TabNavLink } from '../../models/core.model';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  tabNavLinks: TabNavLink[];

  constructor() { }

  ngOnInit() {
    this.configureHomePageLinks();
  }

  private configureHomePageLinks() {
    this.tabNavLinks = [
      new TabNavLink('Home', '/home'),
      new TabNavLink('Events', '/event'),
      new TabNavLink('Value Land', '/value-land'),
    ];
  }

}
