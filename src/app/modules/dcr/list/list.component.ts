import { Component, OnInit } from '@angular/core';
import { DcrService } from '../dcr.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  getAllDcrFilesList: any[] = [];
  selectedProducts: any[] = [];

  constructor(
    private dcrService: DcrService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getAllDcrFiles();
  }

  getAllDcrFiles() {
    this.dcrService.getAllDcrFiles().subscribe({
      next: (res) => {
        if (res.responseStatus === 'success') {
          this.getAllDcrFilesList = res.responseData;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load DCR files. Please try again.'
          });
        }
      },
      error: (err) => {
        console.error('Error fetching DCR files:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Server Error',
          detail: 'An error occurred while fetching DCR files. Please try again later.'
        });
      }
    });
  }

  viewDcrDetail(data: any) {
    this.router.navigate(['/dcr/view', data.dcrFileId]);
  }

  viewAckNakDetail(data: any) {
    this.router.navigate(['/dcr/ack-nak', data.dcrFileId]);
  }

  allDelete() {
    if (this.selectedProducts.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'No items selected for deletion.'
      });
      return;
    }

    const payload = {
      filenames: this.selectedProducts.map(product => product.dcrFileName)
    };

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected items?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dcrService.deleteByDifId(payload).subscribe({
          next: (res) => {
            if (res.responseStatus === 'success') {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: res.responseMessage || 'Items deleted successfully.'
              });
              this.getAllDcrFiles();
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: res.responseMessage || 'Failed to delete items. Please try again.'
              });
            }
          },
          error: (err) => {
            console.error('Error during deletion:', err);
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
