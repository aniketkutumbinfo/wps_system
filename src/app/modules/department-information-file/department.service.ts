import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private httpService: HttpService) { }

  getAllDifFiles() {
    return this.httpService.get(`dif/getAllDifFiles`);
  }

  getRecDifById(id: any) {
    return this.httpService.get(`dif/getRecById?DifFileId=` + id);
  }

  getAllRecirdsOfPendingTxOfDif(status: any) {
    return this.httpService.get(`dif/getRecByStatus?pafStatusForFile=` + status);
  }

  difConfigSetup(data: any) {
    return this.httpService.post(`dif/configretion`, data);
  }

  difConfigDisplay() {
    return this.httpService.get(`dif/config/show`);
  }

  getDifFilesOnPafFilesName(pafFileName: any) {
    return this.httpService.get(`dif/get/diffiles/paf?pafFileName=` + pafFileName);
  }

  getPafFilesOnDifFileName(difFileName: any) {
    return this.httpService.get(`dif/get/paffiles/dif?difFileName=` + difFileName);
  }

  getAllDifPafTxnFiles() {
    return this.httpService.get(`dif/get/alldifpaf/txnfiles`);
  }

  deleteByDifId(data: any) {
    return this.httpService.post(`dif/delete`, data);
  }

  getAckNckList() {
    return this.httpService.delete(`get/all/acknck/for/dif?acknakForFileType=DIF`);
  }
}
