import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-ack-nck-list',
  templateUrl: './ack-nck-list.component.html',
  styleUrls: ['./ack-nck-list.component.scss']
})
export class AckNckListComponent implements OnInit {
  getAllAckNckFilesList: any
  constructor(private difService: DepartmentService,
  ) { }

  ngOnInit() {
    this.getAllAckNck();
  }

  getAllAckNck() {
    this.difService.getAckNckList().subscribe(res => {
      this.getAllAckNckFilesList = res;
    });
  }
}
