import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class RfrService {

  constructor(private httpService: HttpService) { }

  uploadRFRFile(data: any) {
    return this.httpService.post('rfr/upload/csv', data);
  }

  getAllPendingRFR() {
    return this.httpService.get(`rfr/all/pending/file`);
  }

  getRFRByFileName(csvfilename = 'example.xlsx') {
    return this.httpService.get(`rfr/pending/details/bycsvfilename?csvfilename=${csvfilename}`);
  }

  deletePendingRFR(rfrFileName: string) {
    return this.httpService.delete(`rfr/pending/file/delete?rfrFileName=${rfrFileName}`);
  }

  deleteFCR(rfrfcrFileId: string, rfrfdrFileid: string) {
    return this.httpService.delete(`rfr/fdr/delete?rfrfcrfileid=${rfrfcrFileId}&rfrfdrfileid=${rfrfdrFileid}`);
  }

  updateFCR(data: any) {
    return this.httpService.put(`rfr/fdr/update`, data);
  }

  uploadRFRToftp(rfrFileName: any) {
    return this.httpService.get(`rfr/file/upload?rfrFileName=${rfrFileName}`);
  }

  getRFRFiles(startdate: any, endDate: any) {
    return this.httpService.get(`get/sif/uplaod/bydate?startdate=${startdate}&enddate=${endDate}`);
  }

  getALLProceesedFiles() {
    return this.httpService.get(`rfr/all/processed/file`);
  }
}
