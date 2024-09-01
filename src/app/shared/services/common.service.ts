import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, } from 'rxjs';
import { HttpService } from './http.service';
import { HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private _isLoading = new BehaviorSubject<boolean>(false);
  public _isLoading$ = this._isLoading.asObservable();

  private headerTitleSubject = new BehaviorSubject<string>('Default Title');
  headerTitle$ = this.headerTitleSubject.asObservable();
  constructor(private httpService: HttpService,
    private router: Router, private route: ActivatedRoute
  ) {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateHeaderTitle();
    });
   }

   private updateHeaderTitle(): void {
    let route = this.router.routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const title = route.snapshot.data['headerTitle'] || 'Default Title';
    this.headerTitleSubject.next(title);
  }

  toggleLoading(val: boolean) {
    this._isLoading.next(val);
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }

  updateTransaction(data: any) {
    return this.httpService.put(`paf/txn/update`, data);
  }

  getTranscationsRecords(txnRefNo: any) {
    return this.httpService.get(`get/txn/record/by?txnRefNo=${txnRefNo}`);
  }

  login(data: any) {
    return this.httpService.post(`auth/login`, data);
  }

  signup(data: any) {
    return this.httpService.post(`auth/signup`, data);
  }

  forgotPassword(data: any) {
    return this.httpService.get(`auth/reset/link/send/to?email=${data.email}`);
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.httpService.post(``, { oldPassword, newPassword });
  }

  resetPassword(token: string, data: any): Observable<any> {
    console.log(token, data);
    let body = {
      token: token,
      ...data
    };
    // Set the token in the headers
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    // Send the request with data in the body
    // , { headers }
    return this.httpService.post('forgot/password', body, { headers });
  }
}
