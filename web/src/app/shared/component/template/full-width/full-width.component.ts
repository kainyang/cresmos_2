import { Component, OnInit } from '@angular/core';
import { WindowService } from 'src/app/core/services/window.service';

@Component({
    templateUrl: './full-width.component.html',
    styleUrls: ['./full-width.component.scss'],
})
export class FullWidthComponent implements OnInit {

    isMobileDevice = false;

    constructor(private windowService: WindowService) { }

    ngOnInit() {
        this.isMobileDevice = this.windowService.isMobileDevice();
    }
}
