import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalRelationshipService {

  constructor(private httpService: HttpService) { }

  getAllPrcFiles() {
    return this.httpService.get(`get/all/prc/files`);
  }

  getPrcFileById(id: any) {
    return this.httpService.get(`get/prc/record/by?prcFileId=` + id);
  }
}
