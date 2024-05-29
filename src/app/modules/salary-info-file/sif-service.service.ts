import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class SifServiceService {

  constructor(private httpService: HttpService) { }

  uploadCSVFile(data: any) {
    return this.httpService.post('uplaod/csv', data);
  }

  getAllPendingSif() {
    return this.httpService.get(`pending/sif`);
  }

  getRecords(csvfilename = 'example.xlsx') {
    return this.httpService.get(`get/csv?csvfilename=${csvfilename}`);
  }

  deleteRecord(sifscrfileid: number, sifedrfileid:number) {
    return this.httpService.delete(`sif/edr/delete?sifscrfileid=${sifscrfileid}&sifedrfileid=${sifedrfileid}`);
  }

  deleteSifFile(siffilename: string) {
    return this.httpService.delete(`delete/sif?siffilename=${siffilename}`);
  }

  updateRecord(data: any) {
    return this.httpService.put(`sif/edr/update`, data);
  }

  uploadSIFSftp(siffilename: any) {
    return this.httpService.get(`uplaod/sif?siffilename=${siffilename}`);
  }

  getSIFFiles(startdate:any, endDate:any) {
    return this.httpService.get(`get/sif/uplaod/bydate?startdate=${startdate}&enddate=${endDate}`);
  }

}
