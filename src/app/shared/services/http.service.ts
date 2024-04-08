import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  /**
    * Request options.
    * @param headerOptions
    * @returns {RequestOptionsArgs}
    */
  private requestOptions(headerOptions?: any): any {
    let options = {};

    return options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': 'true'
      })
    }
  }

  private requestFormDataOption(headerOptions?: any): any {

    let options = {};

    return options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': 'true'
      })
    }
  }

  /**
   * This method is use for send GET http Request to API.
   * @param url - Additional request URL.
   * @param body - params.
   * @param options  - Header(s) which will pass with particular request.
   */
  get(url: string, options?: any): Observable<any> {
    return this.http.get(this.getFullUrl(url), this.requestOptions(options));
  }

  /**
   * This method is use for send POST http Request to API.
   * @param url - Additional request URL.
   * @param body - POST method parameters
   * @param options - Header(s) which will pass with particular request.
   */
  post(url: string, body: any, options?: any): Observable<any> {
    return this.http.post(this.getFullUrl(url), body, this.requestOptions(options));
  }

  postFormData(url: string, body: any, options?: any): Observable<any> {
    return this.http.post(this.getFullUrl(url), body, this.requestFormDataOption(options));
  }

  put(url: string, body: any, options?: any): Observable<any> {
    return this.http.put(this.getFullUrl(url), body, this.requestOptions(options));
  }

  delete(url: string, options?: any): Observable<any> {
    return this.http.delete(this.getFullUrl(url), this.requestOptions(options));
  }

  /**
    * Build API url.
    * @param url
    * @returns {string}
    */
  private getFullUrl(url: string): string {
    return environment.baseUrl + url;
  }
}
