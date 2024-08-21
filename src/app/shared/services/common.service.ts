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

  updateTranscation(data: any) {
    return this.httpService.put(`paf/txn/update`, data);
  }

  getTranscationsRecords(txnRefNo: any) {
    return this.httpService.get(`get/txn/record/by?txnRefNo=${txnRefNo}`);
  }
}
