import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';

import { IconService } from '../services/icon.service';

@Injectable()
export class ApplicationResolver implements Resolve<any> {

    constructor(
        private iconService: IconService) {
    }

    resolve(): Observable<any> {
        const observables = [
            of(this.iconService.load()),
            of(this.iconService.loadIconSet())
        ];

        return forkJoin(observables);
    }
}
