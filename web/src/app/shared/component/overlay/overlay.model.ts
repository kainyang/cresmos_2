import { EventEmitter } from '@angular/core';

interface InternalOverlayConfig {
    noOverlayPadding: boolean;
}

export interface IOverlayContent  {
    close: EventEmitter<void>;
}

export interface IOverlayBase extends InternalOverlayConfig  {
    disposeOverlay: EventEmitter<void>;
}

export type OverlayConfig = Partial<InternalOverlayConfig & {
    preventCloseOnClickBackDrop: boolean;
}>;

