import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalInformationService {

  constructor(private httpService: HttpService) { }

  getAllPafFiles() {
    return this.httpService.get(`get/all/paf/files`);
  }

  getPafFileById(id: any) {
    return this.httpService.get(`get/paf/record/by?pafFileId=` + id);
  }

  getAllRfaFiles() {
    return this.httpService.get(`get/all/rfa/files`);
  }

  getRfaFileById(id: any) {
    return this.httpService.get(`rfa/record/by?rfaFileId=` + id);
  }

  getRfaData() {
    return this.httpService.get(`rfa/create`);
  }
}
