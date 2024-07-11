import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class AckNckService {

  constructor(private httpService: HttpService) { }

  getAllAckNck() {
    return of([{"acknakFileId":1002,"ackNakFileName":"0000000000617240605075638121212121214.ACK","acknakFileType":"ACK","acknakFileDate":"2024-07-09","acknakForFileId":null,"acknakForFileName":"0000000000617240605075638.SIF","acknakForFileType":"SIF","ackNakFileStatus":"C","ackNakfileRemarks":"No such file present related to ACK or NAK","acknakAhrRecoreds":[],"acknakAtrRecoreds":[]},{"acknakFileId":1004,"ackNakFileName":"0000000000617240605075638121212121214.ACK","acknakFileType":"ACK","acknakFileDate":"2024-07-09","acknakForFileId":null,"acknakForFileName":"0000000000617240605075638.SIF","acknakForFileType":"SIF","ackNakFileStatus":"C","ackNakfileRemarks":"No such file present related to ACK or NAK","acknakAhrRecoreds":[{"acknakAhrFileId":1001,"recType":"AHR","fileStatus":"ACCEPTED","proceedFileName":"0000000000617240525065533.SIF","recData":"AHR,ACCEPTED,0000000000617240525065533.SIF","errorCode":"00840","errorRemarks":"status not in proper format"}],"acknakAtrRecoreds":[{"acknakAtrFileId":1003,"recType":"ATR","fileStatus":"ACCEPTED","numberOfLines":"2","recData":"ATR,ACCEPTED,2","errorCode":null,"errorRemarks":null}]}])
    return this.httpService.get(`get/sif/ackfile/details`);
  }

  findAckNckByFileName(acknakfilename: string) {
    return this.httpService.get(`get/sif/ackfile/details?acknakfilename=${acknakfilename}`);
  }

  findAckNckByDate(startDate: any, endDate: any) {
    return this.httpService.get(`get/sif/related/file/byacknakdate?startdate=${startDate}&enddate=${endDate}`);
  }

  getAckNckDetails(acknakfilename: string) {
    return this.httpService.get(`get/sif/ackfile/details?acknakfilename=${acknakfilename}`);
  }
}
