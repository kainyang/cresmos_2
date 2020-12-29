import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { WindowService } from '../services/window.service';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit, OnDestroy {

  isMobileDevice: boolean;
  private subscriptions: Subscription[] = [];

  constructor(private navigationService: NavigationService,
    private windowService: WindowService) { }

  ngOnInit() {
    this.navigationService.emitNavArea();

    this.isMobileDevice = this.windowService.isMobileDevice();

    this.subscriptions.push(fromEvent(this.windowService.getWindow(), 'resize').pipe(
      debounceTime(200))
      .subscribe(() => {
        this.isMobileDevice = this.windowService.isMobileDevice();
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
