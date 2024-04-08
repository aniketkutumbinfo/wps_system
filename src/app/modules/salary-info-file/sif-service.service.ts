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

  getRecords(CorporateId: any, makkerDate: any) {
    return this.httpService.get(`store/sif/getData?CorporateId=${CorporateId}&makkerDate=${makkerDate}`);
  }

  deleteRecord(recordId: any) {
    return this.httpService.delete(`store/sif/edr/delete?recoredId=${recordId}`);
  }

  updateRecord(recordId: any, data: any) {
    return this.httpService.post(`store/sif/edr/update?recoredId=${recordId}`, data);
  }
}
