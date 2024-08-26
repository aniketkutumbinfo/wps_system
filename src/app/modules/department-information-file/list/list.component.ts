import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../department.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  getAllDifFilesList: any[] = [];  // Initialize as an empty array
  selectedProducts: any[] = [];    // Initialize as an empty array

  constructor(
    private difService: DepartmentService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getAllDifFiles();
  }

  getAllDifFiles() {
    this.difService.getAllDifFiles().subscribe({
      next: (res) => {
        if (res.responseStatus === 'success') {
          this.getAllDifFilesList = res.responseData;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res.responseMessage || 'Failed to load files. Please try again.'
          });
        }
      },
      error: (err) => {
        console.error('Fetching files error:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Server Error',
          detail: 'An error occurred while fetching files. Please try again later.'
        });
      }
    });
  }

  viewDifDetail(data: any) {
    this.router.navigate(['/dif/view', data.difFileId]);
  }

  viewAckNakDetail(data: any) {
    this.router.navigate(['/dif/ack-nak', data.difFileId]);
  }

  allDelete() {
    if (this.selectedProducts.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'No Selection',
        detail: 'No items selected for deletion.'
      });
      return;
    }

    // Prepare the payload with filenames of the selected products
    const payload = {
      filenames: this.selectedProducts.map(product => product.difFileName)
    };

    // Show confirmation dialog to the user
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected items?',
      accept: () => {
        // Proceed with deletion if confirmed
        this.difService.deleteByDifId(payload)
          .subscribe({
            next: (res) => {
              // Check if the response is successful
              if (res.responseStatus === 'success') {
                // Notify the user of successful deletion
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: res.responseMessage || 'Items deleted successfully.'
                });
                // Refresh the list of files
                this.getAllDifFiles();
              } else {
                // Notify the user of failure
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: res.responseMessage || 'Failed to delete items. Please try again.'
                });
              }
            },
            error: (err) => {
              // Handle server errors
              console.error('Deletion error:', err);
              this.messageService.add({
                severity: 'error',
                summary: 'Server Error',
                detail: 'An error occurred while deleting items. Please try again later.'
              });
            }
          });
      }
    });
  }
}
