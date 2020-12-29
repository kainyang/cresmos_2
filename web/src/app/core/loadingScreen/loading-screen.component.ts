import { Component, Injector } from '@angular/core';

import { LOADINGSCREEN_DATA } from './loading-screen.model';

@Component({
    selector: 'app-loading-screen',
    templateUrl: 'loading-screen.component.html',
    styleUrls: ['loading-screen.component.scss']
})
export class LoadingScreenComponent {
    isFullScreen: boolean;

    constructor(injector: Injector) {
        const data = injector.get(LOADINGSCREEN_DATA);
        this.isFullScreen = data.fullScreen;
    }
}
