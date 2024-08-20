import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private _isLoading = new BehaviorSubject<boolean>(false);
  public _isLoading$ = this._isLoading.asObservable();

  constructor() { }

  toggleLoading(val: boolean) {
    this._isLoading.next(val);
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }
}
