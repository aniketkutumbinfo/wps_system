import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../department.service';
import { Router } from '@angular/router';

// Define types for clarity
interface StatusOption {
  label: string;
  value: string;
}

interface DifFile {
  txnRefNo: string;
  [key: string]: any; // Replace with actual properties if known
}

@Component({
  selector: 'app-transaction-records',
  templateUrl: './transaction-records.component.html',
  styleUrls: ['./transaction-records.component.scss']
})
export class TransactionRecordsComponent implements OnInit {
  getAllDifFilesList: DifFile[] = [];
  selectedStatus: string = 'All';
  statusList: StatusOption[] = [
    { label: "All", value: "All" },
    { label: "Pending", value: "Pending" },
    { label: "Send", value: "Send" },
    { label: "Reversal", value: "Reversal" }
  ];

  constructor(
    private difService: DepartmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRecords(this.selectedStatus);
  }

  loadRecords(status: string): void {
    // Map status values to service query parameters
    const statusMap: { [key: string]: string } = {
      'All': '',
      'Pending': 'P',
      'Send': 'S',
      'Reversal': 'R'
    };

    const queryParam = statusMap[status] || '';

    this.difService.getAllRecirdsOfPendingTxOfDif(queryParam).subscribe({
      next: (res) => {
        if (res.responseStatus === 'success') {
          this.getAllDifFilesList = res.responseData;
        } else {
          console.error('Failed to load records:', res.responseMessage);
        }
      },
      error: (err) => {
        console.error('Error fetching records:', err);
      }
    });
  }

  onItemSelect(event: any): void {
    this.selectedStatus = event.value;
    this.loadRecords(this.selectedStatus);
  }

  viewTranscation(data: DifFile): void {
    this.router.navigate(['/dif/transaction', data.txnRefNo]);
  }
}
