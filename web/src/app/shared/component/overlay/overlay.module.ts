import { NgModule } from '@angular/core';
import { OverlayModule as CdkOverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { OverlayComponent } from './overlay.component';
import { OverlayService } from './overlay.service';

@NgModule({
    declarations: [
        OverlayComponent
    ],
    entryComponents: [
        OverlayComponent
    ],
    imports: [
        CommonModule,
        CdkOverlayModule,
        PortalModule,
        MatButtonModule,
        MatIconModule
    ],
    exports: [
        MatButtonModule,
        MatIconModule
    ]
})
export class OverlayModule {
    public static rootProviders() {
        return [OverlayService];
    }
}