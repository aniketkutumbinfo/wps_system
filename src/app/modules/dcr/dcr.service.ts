import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class DcrService {

  
  constructor(private httpService: HttpService) { }

  getAllDcrFiles() {
    return this.httpService.get(`dcr/get/all/files`);
  }

  getRecDcrById(id: any) {
    return this.httpService.get(`dcr/getRecById?DcrFileId=` + id);
  }

  getAllRecirdsOfPendingTxOfDif(status: any) {
    return this.httpService.get(`dcr/getRecByStatus?pafStatusForFile=` + status);
  }

  dcrConfigSetup(data: any) {
    return this.httpService.post(`dcr/configretion`, data);
  }

  dcrConfigDisplay() {
    return this.httpService.get(`dcr/config/show`);
  }

  getDifFilesOnPafFilesName(pafFileName: any) {
    return this.httpService.get(`dcr/get/diffiles/paf?pafFileName=` + pafFileName);
  }

  getPafFilesOnDifFileName(difFileName: any) {
    return this.httpService.get(`dcr/get/paffiles/dcr?difFileName=` + difFileName);
  }

  getAllDifPafTxnFiles() {
    return this.httpService.get(`dcr/get/alldifpaf/txnfiles`);
  }

  deleteByDifId(data: any) {
    return this.httpService.post(`dcr/delete`, data);
  }

  getAckNckList() {
    return this.httpService.get(`get/all/acknck/for/dcr?acknakForFileType=DCR`);
  } 
  
  getAckNakForFileName(acknakForFileName: any, acknakForFileId: any) {
    return this.httpService.get(`find/acnck/by/dcr?acknakForFileName=${acknakForFileName}&acknakForFileId=` + acknakForFileId);
  }

}
