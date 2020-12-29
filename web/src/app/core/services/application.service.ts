import { Injectable } from '@angular/core';

@Injectable()
export class ApplicationService {
    baseUrl: string;
    apiBaseUrl: string;
    webUrl: string;
    loginUrl: string;
    rewardCentreBaseUrl: string;

    constructor() {
        this.baseUrl = document.getElementsByTagName('base')[0].href;
        this.apiBaseUrl = this.baseUrl + 'api';
        this.webUrl = this.baseUrl;
        this.loginUrl = this.baseUrl + 'login';
    }
}
