import { Injectable } from '@angular/core';
import { Country } from '../models/core.model';

@Injectable()
export class SelectService {

    getCountries(): Country[] {
        const countries: Country[] = [ {name: 'Singapore', ISOCode: 'SGP'} ];

        return countries;
    }

    getGroupSizeList(): number[] {
        return [ 2, 3, 4, 5];
    }
}
