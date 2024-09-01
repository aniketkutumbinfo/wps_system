import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class RFRAckNckService {

  constructor(private httpService: HttpService) { }

  getAllAckNck() {
    return this.httpService.get(`rfr/ackfile/details`);
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
