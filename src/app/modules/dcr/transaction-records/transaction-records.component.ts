import { Component, OnInit } from '@angular/core';
import { DcrService } from '../dcr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-records',
  templateUrl: './transaction-records.component.html',
  styleUrls: ['./transaction-records.component.scss']
})

export class TransactionRecordsComponent implements OnInit {
  
  getAllDifFilesList: any = [];
  selectedStatus: any;
  statusList: any
  constructor(private dcrService: DcrService,
    private router: Router
  ) {
    this.statusList = [
      { label: "All", value: "All" },
      { label: "Pending", value: "Pending" },
      { label: "Send", value: "Send" },
      { label: "Reversal", value: "Reversal" }
    ]
  }

  ngOnInit() {
    this.getAllRecirdsOfPendingTxOfDif('C');
  }

  getAllRecirdsOfPendingTxOfDif(data: any) {
    this.dcrService.getAllRecirdsOfPendingTxOfDif(data).subscribe(res => {
      this.getAllDifFilesList = res;
    });
  }

  onItemSelect(event: any) {
    if (event.value.value === 'All') {
      this.getAllRecirdsOfPendingTxOfDif('');
    } else if (event.value.value === 'Pending') {
      this.getAllRecirdsOfPendingTxOfDif('P');
    } else if (event.value.value === 'Send') {
      this.getAllRecirdsOfPendingTxOfDif('S');
    } else if (event.value.value === 'Reversal') {
      this.getAllRecirdsOfPendingTxOfDif('R');
    }
  }

  viewTranscation(data: any) {
    this.router.navigate(['/pif/view', data.pafFileId]);
  }

}
