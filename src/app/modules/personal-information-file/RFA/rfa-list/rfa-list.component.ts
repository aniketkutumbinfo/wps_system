import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalInformationService } from '../../personal-information.service';
import { MessageService } from 'primeng/api';

// Define interfaces for better type safety
interface RfaFile {
  rfaFileId: number;
  rfaFileName: string;
  fileReason: string;
  fileStatus: string;
  fileCreationDate: string;
  makerDate: string;
}

interface RfaFilesResponse {
  responseStatus: string;
  responseData: RfaFile[];
}

@Component({
  selector: 'app-rfa-list',
  templateUrl: './rfa-list.component.html',
  styleUrls: ['./rfa-list.component.scss']
})
export class RfaListComponent implements OnInit {

  getAllRfaFilesList: RfaFile[] = [];
  isLoading: boolean = false;

  constructor(
    private pifService: PersonalInformationService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getAllRfa();
  }

  getAllRfa() {
    this.isLoading = true;
    this.pifService.getAllRfaFiles().subscribe({
      next: (res: RfaFilesResponse) => {
        if (res.responseStatus === 'success') {
          this.getAllRfaFilesList = res.responseData;
        } else {
          this.handleError('Failed to load RFA files.');
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.handleError('An error occurred while fetching RFA files.');
      }
    });
  }

  viewPrcDetail(data: RfaFile) {
    this.router.navigate(['/pif/rfa-view', data.rfaFileId]);
  }

  SyncData(): void {
    this.isLoading = true;
    this.pifService.getRfaData().subscribe({
      next: (res: RfaFilesResponse) => {
        if (res.responseStatus === 'success') {
          this.getAllRfa(); // Refresh the list after successful sync
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Data synchronized successfully.'
          });
        } else {
          this.handleError('Failed to synchronize data. Please try again.');
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.handleError('An error occurred while syncing data.');
      }
    });
  }

  private handleError(message: string): void {
    console.error(message); // Log the error for debugging
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message
    });
  }
}
