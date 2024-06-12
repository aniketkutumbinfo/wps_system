import { Component, OnInit } from '@angular/core';
import { PersonalInformationService } from '../personal-information.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  getAllPafFilesList: any;

  constructor(private pifService: PersonalInformationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllPafFiles();
  }

  getAllPafFiles() {
    this.pifService.getAllPafFiles().subscribe(res => {
      this.getAllPafFilesList = res;
    });
  }

  viewPrcDetail(data: any) {
    this.router.navigate(['/pif/view', data.pafFileId]);
  }
}
