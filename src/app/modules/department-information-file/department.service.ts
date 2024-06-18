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
}
