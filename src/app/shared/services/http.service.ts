import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  /**
   * Retrieve the authentication token from local storage or any other secure place
   */
  public getAuthToken(): string | null {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        return parsedData.token || null;
      } catch (e) {
        console.error('Failed to parse user data:', e);
        return null;
      }
    }
    return null;
  }

  /**
   * Create request options with headers.
   * @param headerOptions
   * @returns {object}
   */
  private createRequestOptions(headerOptions?: any): any {
    const token = this.getAuthToken();
    const headersConfig: { [key: string]: string } = {
      'Content-Type': 'application/json',
      ...headerOptions // Merge any additional headers provided
    };

    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }

    return {
      headers: new HttpHeaders(headersConfig)
    };
  }

  private createFormDataOptions(headerOptions?: any): any {
    const token = this.getAuthToken();
    const headersConfig: { [key: string]: string } = {
      'Accept': 'application/json',
      ...headerOptions // Merge any additional headers provided
    };

    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }

    return {
      headers: new HttpHeaders(headersConfig)
    };
  }

  /**
   * Send GET HTTP requests to API.
   * @param url - Request URL.
   * @param options - Additional headers.
   * @returns Observable<any>
   */
  get(url: string, options?: any): Observable<any> {
    return this.http.get(this.getFullUrl(url), this.createRequestOptions(options));
  }

  /**
   * Send POST HTTP requests to API.
   * @param url - Request URL.
   * @param body - Request body.
   * @param options - Additional headers.
   * @returns Observable<any>
   */
  post(url: string, body: any, options?: any): Observable<any> {
    return this.http.post(this.getFullUrl(url), body, this.createRequestOptions(options));
  }

  postFormData(url: string, body: any, options?: any): Observable<any> {
    return this.http.post(this.getFullUrl(url), body, this.createFormDataOptions(options));
  }

  put(url: string, body: any, options?: any): Observable<any> {
    return this.http.put(this.getFullUrl(url), body, this.createRequestOptions(options));
  }

  delete(url: string, options?: any): Observable<any> {
    return this.http.delete(this.getFullUrl(url), this.createRequestOptions(options));
  }

  /**
   * Build API URL.
   * @param url
   * @returns {string}
   */
  private getFullUrl(url: string): string {
    return `${environment.baseUrl}${url}`;
  }
}
