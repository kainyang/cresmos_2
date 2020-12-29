import { Injectable, EventEmitter } from '@angular/core';
import { Overlay, OverlayConfig as CdkOverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { take } from 'rxjs/operators';

import { OverlayComponent } from './overlay.component';
import { OverlayConfig } from './overlay.model';

@Injectable()
export class OverlayService {
    lastFocus: HTMLElement;

    constructor(private overlay: Overlay) {
    }

    open(component, componentData = {}, config: OverlayConfig = {}) {
        this.lastFocus = <HTMLElement>document.activeElement;

        const overlayConfig = new CdkOverlayConfig({
            hasBackdrop: true,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy: this.overlay.position().global(),
            backdropClass: 'overlay-backdrop-custom',
            disposeOnNavigation: true
        });

        const overlayRef = this.overlay.create(overlayConfig);
        const disposeOverlay = new EventEmitter<void>();

        disposeOverlay.pipe(take(1)).subscribe(() => {
            overlayRef.dispose();
            disposeOverlay.complete();
            this.lastFocus.focus();
        });

        setTimeout(() => { // TODO: Angular CDK Overlay - Remove after Angular bug is fixed
            const { instance: portalInstance } = overlayRef.attach(new ComponentPortal(OverlayComponent));
            Object.assign(portalInstance, config, { disposeOverlay });

            const { instance: componentInstance } = portalInstance.portalOutlet.attach(new ComponentPortal(component));
            Object.assign(componentInstance, componentData, { close: portalInstance.close });

            overlayRef.backdropClick().subscribe(() => {
                if (!config.preventCloseOnClickBackDrop) {
                    /*
                        Before disposing the overlay, the sliding-out animation needs to be triggered first.
                        Hence, the base component closeOverlay is called here.
                    */
                    portalInstance.closeOverlay();
                }
            });
        });
    }
}
