import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-transaction-records',
  templateUrl: './transaction-records.component.html',
  styleUrls: ['./transaction-records.component.scss']
})
export class TransactionRecordsComponent implements OnInit {
  getAllDifFilesList: any = []
  constructor(private difService: DepartmentService) { }

  ngOnInit() {
    this.getAllRecirdsOfPendingTxOfDif();
  }

  getAllRecirdsOfPendingTxOfDif() {
    this.difService.getAllRecirdsOfPendingTxOfDif('C').subscribe(res => {
      this.getAllDifFilesList = res;
    });
  }
}
