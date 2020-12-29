import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiHttpClient } from './api-http-client';

@Injectable()
export class TextService {
    text: any;

    constructor(
        private httpClient: ApiHttpClient
    ) { }

    load(): Observable<boolean> {
        return this.httpClient.getWebResource('/assets/text.json')
            .pipe(
                map(resp => {

                    this.text = JSON.parse(resp.body || '{}');

                    return true;
                })
            );
    }

    getText(textKey: string, replacements?: (string | number)[]): string {
        let value: string = 'key_' + textKey + '_missing';

        if (this.text[textKey]) {
            value = this.text[textKey];
        }

        if (replacements && replacements.length > 0) {
            replacements.forEach((repText, i) => {
                value = value.replace(`{${i}}`, repText.toString());
            });
        }

        return value;
    }
}
