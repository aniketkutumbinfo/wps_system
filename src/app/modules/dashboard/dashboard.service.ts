import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = 'get';  // Base URL or part of URL common to multiple requests

  constructor(private httpService: HttpService) { }

  getStatus(type: string) {
    return this.httpService.get(`${this.baseUrl}/${type}/file/count?fileStatus=`);
  }

  getCount(type: string) {
    return this.httpService.get(`${this.baseUrl}/${type}/file/count?fileStatus=`);
  }

  // Example usage:
  getDCRStatus() {
    return this.getStatus('dcr');
  }

  getDIFStatus() {
    return this.getStatus('dif');
  }

  getPAFStatus() {
    return this.getStatus('paf');
  }

  getPRCStatus() {
    return this.getStatus('prc');
  }

  getRFAStatus() {
    return this.getStatus('rfa');
  }

  getTXNStatus() {
    return this.httpService.get(`${this.baseUrl}/txn/count?fileStatus=`);
  }

  getDCRCount() {
    return this.getCount('dcr');
  }

  getDIFCount() {
    return this.getCount('dif');
  }

  getPAFCount() {
    return this.getCount('paf');
  }

  getPRCCount() {
    return this.getCount('prc');
  }

  getRFACount() {
    return this.getCount('rfa');
  }
}
