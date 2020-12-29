import { ComponentPortal, DomPortalOutlet, PortalInjector } from '@angular/cdk/portal';
import { ApplicationRef, ComponentFactoryResolver, Injectable, InjectionToken, Injector } from '@angular/core';

import { LoadingScreenComponent } from './loading-screen.component';
import { LOADINGSCREEN_DATA, LoadingScreenData } from './loading-screen.model';

@Injectable()
export class LoadingScreenService {
    private portals: LoadingScreenPortal[] = [];

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector) {
    }

    show(host: HTMLElement = null) {
        let fullScreen = false;

        if (!host) {
            host = document.body;
            fullScreen = true;
        }

        let portal = this.portals.find(x => x.portalOutlet.outletElement === host);

        if (portal) {
            return;
        }

        portal = {
            portalOutlet: new DomPortalOutlet(host, this.componentFactoryResolver, this.appRef, this.injector),
            initialStyle: {
                display: host.style.display,
                position: host.style.position
            }
        };

        this.portals.push(portal);

        Object.assign(host.style, { display: 'block', position: 'relative' });

        const loadingScreenPortal = new ComponentPortal(LoadingScreenComponent, null, this.createInjector(fullScreen));

        setTimeout(() => { // TODO: Angular CDK Overlay - Remove after Angular bug is fixed
            if (this.portals.indexOf(portal) > -1) {
                portal.portalOutlet.attach(loadingScreenPortal);
            }
        });
    }

    hide(host = document.body) {
        const portal = this.portals.find(x => x.portalOutlet.outletElement === host);

        if (portal) {
            const index = this.portals.indexOf(portal);
            this.portals.splice(index, 1);

            Object.assign(host.style, { display: portal.initialStyle.display, position: portal.initialStyle.position });

            if (portal.portalOutlet.hasAttached) {
                portal.portalOutlet.detach();
            }
        }
    }

    private createInjector(fullScreen: boolean): PortalInjector {
        const injectorTokens = new WeakMap<InjectionToken<LoadingScreenData>, LoadingScreenData>();
        injectorTokens.set(LOADINGSCREEN_DATA, { fullScreen });
        return new PortalInjector(this.injector, injectorTokens);
    }
}

interface LoadingScreenPortal {
    portalOutlet: DomPortalOutlet;
    initialStyle: {
        display: string,
        position: string
    };
}
