import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiHttpClient } from './api-http-client';

@Injectable()
export class IconService {
    private iconSet: { [id: string]: SVGElement } = {};

    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
        private httpClient: ApiHttpClient
    ) { }

    load(): Observable<boolean> {
        this.matIconRegistry.addSvgIconSet(this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons.svg'));

        return of(true);
    }

    getIcon(id: string): SVGElement {
        return this.iconSet[id];
    }

    getIconSetKeys(): string[] {
        return Object.keys(this.iconSet);
    }

    loadIconSet(): Observable<any> {
        const url = '/assets/icons.svg';

        return this.httpClient.getWebResource(url).pipe(
            map(response => {
                this.extractSvgsFromText(response.body);
            }));
    }

    private extractSvgsFromText(svgText: string) {
        const div = document.createElement('DIV');
        div.innerHTML = svgText;

        const svg = <SVGElement>div.querySelector('svg');
        const defs = <Element>svg.querySelector('defs');
        const svgs = <NodeListOf<SVGElement>>defs.querySelectorAll('svg');

        for (let i = 0; i < svgs.length; i++) {
            const icon = svgs.item(i);
            const iconElement = <SVGElement>icon;
            iconElement.setAttribute('focusable', 'false');
            iconElement.setAttribute('role', 'presentation');
            this.iconSet[icon.id] = <SVGElement>icon;
        }
    }
}
