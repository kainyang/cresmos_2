import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { CdkPortalOutlet } from '@angular/cdk/portal';

import { take } from 'rxjs/operators';

import { flyInOut, AnimationState } from './overlay.animation';
import { IOverlayBase } from './overlay.model';

@Component({
    selector: 'app-overlay',
    templateUrl: 'overlay.component.html',
    styleUrls: ['./overlay.component.scss'],
    animations: [flyInOut]
})
export class OverlayComponent implements OnInit, AfterViewInit, IOverlayBase {
    @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet: CdkPortalOutlet;
    @ViewChild('closeButton', { static: false }) closeButtonEl: HTMLElement;

    focusSet = false;
    noOverlayPadding: boolean;
    disposeOverlay: EventEmitter<void>;
    animate = AnimationState.void;
    close = new EventEmitter<void>();

    onAnimationDone() {
        if (this.animate === AnimationState.out) {
            this.disposeOverlay.emit();
        }
    }

    ngOnInit() {
        this.animate = AnimationState.in;

        this.close.pipe(take(1)).subscribe(() => {
            this.closeOverlay();
            this.close.complete();
        })
    }

    ngAfterViewInit() {
        this.setFocusOnCloseIcon();
    }

    closeOverlay() {
        this.animate = AnimationState.out;
    }

    private setFocusOnCloseIcon() {
        this.closeButtonEl.focus()
    }
}