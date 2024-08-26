import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentService } from '../department.service';

// Define an interface for the AckNck file data
interface AckNckFile {
  ackNakFileName: string;
  acknakForFileName: string;
  acknakForFileType: string;
  ackNakFileStatus: string;
  ackNakfileRemarks: string;
  acknakFileDate: string;
  acknakFileType: string;
  acknakForFileId: string; // ID used for navigation
}

@Component({
  selector: 'app-ack-nck-list',
  templateUrl: './ack-nck-list.component.html',
  styleUrls: ['./ack-nck-list.component.scss']
})
export class AckNckListComponent implements OnInit {
  getAllAckNckFilesList: AckNckFile[] = []; // Type safety for the list
  loading: boolean = false; // Loading state
  error: string | null = null; // Error state

  constructor(private departmentService: DepartmentService, // Renamed for clarity
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllAckNck();
  }

  getAllAckNck() {
    this.loading = true; // Set loading to true when starting data fetch
    this.departmentService.getAckNckList().subscribe({
      next: res => {
        if (res.responseStatus === 'success') {
          this.getAllAckNckFilesList = res.responseData;
          this.error = null; // Clear any previous errors
        } else {
          this.error = 'Failed to load data'; // Handle case where response status is not success
        }
      },
      error: err => {
        this.error = 'An error occurred while fetching data'; // Handle error response
        console.error('Error fetching ACK/NCK list:', err);
      },
      complete: () => {
        this.loading = false; // Set loading to false when data fetch is complete
      }
    });
  }

  viewAckNakDetail(data: AckNckFile) {
    this.router.navigate(['/dif/ack-nak', data.acknakForFileId]);
  }
}
