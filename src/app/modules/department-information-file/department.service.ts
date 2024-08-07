import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private httpService: HttpService) { }

  getAllDifFiles() {
    return this.httpService.get(`get/all/dif/files`);
  }

  getRecDifById(id: any) {
    return this.httpService.get(`dif/record/by?difFileId=` + id);
  }

  getAllRecirdsOfPendingTxOfDif(status: any) {
    return this.httpService.get(`get/txn/by?pafStatusForFile=` + status + `&fileIdOfFilename=`);
  }

  difConfigSetup(data: any) {
    return this.httpService.post(`configretion`, data);
  }

  difConfigDisplay() {
    return this.httpService.get(`config/show`);
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
    return this.httpService.get(`get/all/acknck/for/dif?acknakForFileType=DIF`);
  }

  getAckNakForFileName(acknakForFileName: any, acknakForFileId: any) {
    return this.httpService.get(`find/acnck/by/dif?acknakForFileName=${acknakForFileName}&acknakForFileId=` + acknakForFileId);
  }

}
