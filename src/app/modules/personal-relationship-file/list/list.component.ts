import { Component, OnInit } from '@angular/core';
import { PersonalRelationshipService } from '../personal-relationship.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  getAllPrcFilesList: any;

  constructor(private prfService: PersonalRelationshipService) { }

  ngOnInit() {
    this.getAllPrcFiles();
  }

  getAllPrcFiles() {
    this.prfService.getAllPrcFiles().subscribe(res => {
      this.getAllPrcFilesList = res;
    });
  }
}