import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SifServiceService {
  hostUrl = "http://43.204.214.255:8085/"

  constructor(private httpClient: HttpClient) { }
  
  createExcelTable(data: any) {
    return this.httpClient.post(this.hostUrl + `store/sif/send/csv`, data)
  }
}
