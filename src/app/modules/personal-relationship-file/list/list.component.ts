import { Component, OnInit } from '@angular/core';
import { PersonalRelationshipService } from '../personal-relationship.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  getAllPrcFilesList: any;

  constructor(private prfService: PersonalRelationshipService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllPrcFiles();
  }

  getAllPrcFiles() {
    this.prfService.getAllPrcFiles().subscribe(res => {
      if (res.responseStatus === 'success') {
        this.getAllPrcFilesList = res.responseData;
      }
    });
  }

  viewPrcDetail(data: any) {
    this.router.navigate(['/prf/view', data.prcFileId]);
  }
}