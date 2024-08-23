import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalInformationService } from '../../personal-information.service';

@Component({
  selector: 'app-rfa-list',
  templateUrl: './rfa-list.component.html',
  styleUrls: ['./rfa-list.component.scss']
})
export class RfaListComponent implements OnInit {

  getAllRfaFilesList: any;

  constructor(private pifService: PersonalInformationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllRfa();
  }

  getAllRfa() {
    this.pifService.getAllRfaFiles().subscribe(res => {
      if (res.responseStatus === 'success') {
        this.getAllRfaFilesList = res.responseData;
      }
    });
  }

  viewPrcDetail(data: any) {
    this.router.navigate(['/pif/rfa-view', data.rfaFileId]);
  }

  SyncData() {
    this.pifService.getRfaData().subscribe(res => {
      if (res.responseStatus === 'success') {
        this.getAllRfa();
      }
    });
  }

}
