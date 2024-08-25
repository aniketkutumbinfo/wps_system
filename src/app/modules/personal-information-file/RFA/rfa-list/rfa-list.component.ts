import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalInformationService } from '../../personal-information.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-rfa-list',
  templateUrl: './rfa-list.component.html',
  styleUrls: ['./rfa-list.component.scss']
})
export class RfaListComponent implements OnInit {

  getAllRfaFilesList: any;

  constructor(private pifService: PersonalInformationService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getAllRfa();
  }

  getAllRfa() {
    this.pifService.getAllRfaFiles().subscribe(res => {
      if (res.responseStatus === 'success') {
        this.getAllRfaFilesList = res.responseData;
      }
    });
  }

  viewPrcDetail(data: any) {
    this.router.navigate(['/pif/rfa-view', data.rfaFileId]);
  }

  SyncData(): void {
    this.pifService.getRfaData().subscribe({
      next: (res) => {
        if (res.responseStatus === 'success') {
          // Call method to handle the successful retrieval of data
          this.getAllRfa();
        } else {
          // Handle the case where the response status is not 'success'
          this.handleError('Failed to synchronize data. Please try again.');
        }
      },
      error: (err) => {
        // Handle any errors that occur during the HTTP request
        this.handleError('An error occurred while syncing data.');
      }
    });
  }

  private handleError(message: string): void {
    console.error(message);
    // Show a user-friendly error message
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message
    });
  }


}
