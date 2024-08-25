import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private _isLoading = new BehaviorSubject<boolean>(false);
  public _isLoading$ = this._isLoading.asObservable();

  constructor(private httpService: HttpService) { }

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

  getProfileUser() {
    return this.httpService.get(`users/by/token`);
  }

  updateProfile(data: any) {
    return this.httpService.post(`profile/update`, data);
  }

  forgotPassword(data: any) {
    return this.httpService.get(`reset/link/send/to?email=${data.email}`);
  }
}
