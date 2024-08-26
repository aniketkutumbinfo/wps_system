import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DcrService } from '../../dcr.service';

// Define an interface for the response data type
interface DcrFile {
  txnRefNo: string;
  pafFileName: string;
  pafStatusForFile: string;
  empId: string;
  availableBal: number;
  remmitAmt: number;
  totalTxnAmt: number;
  txnAmt: number;
  txnDate: string;
}

enum Status {
  All = 'All',
  Pending = 'Pending',
  Send = 'Send',
  Reversal = 'Reversal'
}

@Component({
  selector: 'app-transaction-records',
  templateUrl: './transaction-records.component.html',
  styleUrls: ['./transaction-records.component.scss']
})

export class TransactionRecordsComponent implements OnInit {

  getAllDcrFilesList: DcrFile[] = [];
  selectedStatus: Status = Status.All;
  statusList = [
    { label: "All", value: Status.All },
    { label: "Pending", value: Status.Pending },
    { label: "Send", value: Status.Send },
    { label: "Reversal", value: Status.Reversal }
  ];

  constructor(private dcrService: DcrService, private router: Router) { }

  ngOnInit() {
    this.fetchRecords(Status.All); // Fetch all records initially
  }

  fetchRecords(status: Status) {
    const statusCodeMap: { [key in Status]: string } = {
      [Status.All]: '',
      [Status.Pending]: 'P',
      [Status.Send]: 'S',
      [Status.Reversal]: 'R'
    };

    this.dcrService.getAllRecirdsOfPendingTxOfDif(statusCodeMap[status]).subscribe({
      next: (res) => {
        if (res.responseStatus === 'success') {
          this.getAllDcrFilesList = res.responseData;
        } else {
          // Handle non-success response status
          console.error('Error fetching records:', res.responseMessage);
        }
      },
      error: (err) => {
        // Handle server or network errors
        console.error('Error fetching records:', err);
      }
    });
  }

  onItemSelect(event: any) {
    this.selectedStatus = event.value;
    this.fetchRecords(this.selectedStatus);
  }

  viewTranscation(data: DcrFile) {
    this.router.navigate(['/dcr/transaction', data.txnRefNo]);
  }
}
