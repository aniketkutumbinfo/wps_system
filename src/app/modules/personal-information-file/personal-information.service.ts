import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalInformationService {

  constructor(private httpService: HttpService) { }

  getAllPafFiles() {
    return this.httpService.get(`paf/getAllPafFiles`);
  }

  getPafFileById(id: any) {
    return this.httpService.get(`paf/getRecById/` + id);
  }
}
