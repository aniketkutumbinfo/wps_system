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
    return this.httpService.get(`store/sif/getData?CorporateId=${CorporateId}&makkerDate=${makkerDate}`);
  }

  deleteRecord(sifEdrFileId: any,sifScrFileId:any) {
    return this.httpService.delete(`store/sif/edr/delete?sifscrfileid=${sifScrFileId}&sifedrfileid=${sifEdrFileId}`);
  }

  updateRecord(data: any) {
    return this.httpService.put(`store/sif/edr/update`, data);
  }

  createZipFile(data: any) {
    return this.httpService.post('sif/create', data)
  }

  getSIFFiles() {
    return this.httpService.get(`sif/getsiffiles`);
  }
}
