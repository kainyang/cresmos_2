import { InjectionToken } from '@angular/core';

export const LOADINGSCREEN_DATA = new InjectionToken<LoadingScreenData>('LOADINGSCREEN_DATA');

export interface LoadingScreenData {
    fullScreen: boolean;
}
