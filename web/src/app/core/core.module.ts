import { NgModule } from '@angular/core';

import { CoreService } from './services/core.service';
import { TextService } from './services/text.service';
import { ApiHttpClient } from './services/api-http-client';
import { ApplicationService } from './services/application.service';
import { IconService } from './services/icon.service';
import { NavigationService } from './services/navigation.service';
import { SelectService } from './services/select.service';
import { LoadingScreenService } from './loadingScreen/loading-screen.service';

import { LoadingScreenModule } from './loadingScreen/loading-screen.module';
import { WindowService } from './services/window.service';
import { ProfileService } from '../profile/profile.service';

@NgModule({
    imports: [
        LoadingScreenModule
    ],
    providers: [
        CoreService,
        TextService,
        ApiHttpClient,
        ApplicationService,
        IconService,
        NavigationService,
        SelectService,
        LoadingScreenService,
        WindowService,
        ProfileService
    ]
})

export class CoreModule {}
