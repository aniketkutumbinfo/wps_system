import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpService: HttpService) { }

  getProfileUser() {
    return this.httpService.get(`users/by/token`);
  }

  updateProfile(data: any) {
    return this.httpService.post(`profile/update`, data);
  }

  changePassword(oldPass: string, newPassword: string): Observable<any> {
    return this.httpService.post(`change/password`, { oldPass, newPassword });
  }
}
