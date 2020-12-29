import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationService } from './application.service';

export interface IHttpClientOptions {
    headers: HttpHeaders;
    params: HttpParams;
}

export interface IHttpParamOptions {
    key: string;
    value: any;
}

@Injectable()
export class ApiHttpClient {

    private apiBaseUrl: string;

    constructor(
        private http: HttpClient,
        private applicationService: ApplicationService) {
        this.apiBaseUrl = applicationService.baseUrl + 'api';
    }

    unsecurePost<T>(url: string, model: any): Observable<T> {
        return this.http.post<T>(this.apiUrl(url), model, this.httpOptions());
    }

    unsecureGet<T>(url: string, params?: IHttpParamOptions[]): Observable<T> {
        const options = this.httpOptions();
        if (params) {
            options.params = new HttpParams();
            params.forEach(p => {
                options.params = options.params.append(p.key, p.value);
            });
        }

        return this.http.get<T>(this.apiUrl(url), options);
    }

    post<T>(url: string, model: any): Observable<T> {
        return this.http.post<T>(this.apiUrl(url), model, this.httpOptions());
    }

    postImage(url: string, model: any) {
        return this.http.post(this.apiUrl(url), model, {  observe: 'response' });
    }

    getWebResource(url: string): Observable<HttpResponse<string>> {
        let headers = new HttpHeaders();

        headers = headers.append('Content-Type', 'application/text');
        headers = headers.append('X-Requested-With', 'XMLHttpRequest');

        return this.http.get(this.webUrl(url), { headers: headers, observe: 'response', responseType: 'text' });
    }

    get<T>(url: string, params?: IHttpParamOptions[]): Observable<T> {
        if (localStorage.getItem('token') !== null) {
            const options = this.secureHttpOptions();

            if (params) {
                options.params = new HttpParams();
                params.forEach(p => {
                    options.params = options.params.append(p.key, p.value);
                });
            }

            return this.http.get<T>(this.apiUrl(url), options);
        }
    }

    private webUrl(relativeUrl: string): string {
        return `${this.applicationService.webUrl}${relativeUrl}`;
    }

    private apiUrl(url: string): string {
        return `${this.apiBaseUrl}${url}`;
    }

    private httpOptions() {
        const options = <IHttpClientOptions>{
            headers: new HttpHeaders({
                ...this.jsonHeaders()
            })
        };

        return options;
    }

    private secureHttpOptions() {
        const options = <IHttpClientOptions>{
            headers: new HttpHeaders({
                ...this.jsonHeaders(),
                ...this.tokenHeader()
            })
        };

        return options;
    }

    private jsonHeaders() {
        return {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            observe: 'response',
        };
    }

    private tokenHeader() {
        if (localStorage.getItem('token') !== null) {
            return { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
        }
        return {};
    }
}
