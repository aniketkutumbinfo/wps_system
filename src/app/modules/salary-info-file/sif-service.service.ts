import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class SifServiceService {

  constructor(private httpService: HttpService) { }

  createExcelTable(data: any) {
    return this.httpService.post('store/sif/send/csv', data)
  }

  getRecords(CorporateId = '0000000000617', makkerDate = new Date().toISOString().slice(0, 10)) {
    return this.httpService.get(`store/sif/getstorerec/${CorporateId}/${makkerDate}`);
  }

  deleteRecord(recordId: any) {
    return this.httpService.delete(`store/sif/edr/delete?recoredId=${recordId}`);
  }

  updateRecord(recordId: any, data: any) {
    return this.httpService.post(`store/sif/edr/update?recoredId=${recordId}`, data);
  }
}
