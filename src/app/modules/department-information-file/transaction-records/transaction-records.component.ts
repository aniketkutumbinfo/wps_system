import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-transaction-records',
  templateUrl: './transaction-records.component.html',
  styleUrls: ['./transaction-records.component.scss']
})
export class TransactionRecordsComponent implements OnInit {
  getAllDifFilesList: any = [];
  selectedStatus: any;
  statusList: any
  constructor(private difService: DepartmentService) {
    this.statusList = [
      { label: "All", value: "All" },
      { label: "P", value: "P" },
      { label: "C", value: "C" },
      { label: "R", value: "R" }
    ]
  }

  ngOnInit() {
    this.getAllRecirdsOfPendingTxOfDif('C');
  }

  getAllRecirdsOfPendingTxOfDif(data: any) {
    this.difService.getAllRecirdsOfPendingTxOfDif(data).subscribe(res => {
      this.getAllDifFilesList = res;
    });
  }

  onItemSelect(event: any) {
    if (event.value.value === 'All') {
      this.getAllRecirdsOfPendingTxOfDif('');
    } else {
      this.getAllRecirdsOfPendingTxOfDif(event.value.value);
    }
  }
}
