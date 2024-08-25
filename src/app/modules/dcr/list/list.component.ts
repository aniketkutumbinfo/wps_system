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

  getAllDcrFilesList!: any[];
  selectedProducts!: any[];
  constructor(private difService: DcrService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.getAllDcrFiles();
  }

  getAllDcrFiles() {
    this.difService.getAllDcrFiles().subscribe(res => {
      if (res.responseStatus === 'success') {
        this.getAllDcrFilesList = res.responseData;
      }
    });
  }

  viewDcrDetail(data: any) {
    this.router.navigate(['/dcr/view', data.dcrFileId]);
  }

  viewAckNakDetail(data: any) {
    this.router.navigate(['/dcr/ack-nak', data.dcrFileId]);
  }

  // onDelete(data: any) {
  //   let item =
  //   {
  //     "diffilenames": this.selectedProducts
  //   }
  //   this.confirmationService.confirm({
  //     message: 'Are you sure that you want to delete?',
  //     accept: () => {
  //       this.difService.deleteByDifId(item).subscribe(res => {
  //         if (res) {
  //           this.messageService.add({
  //             severity: 'success', detail: res.responsemassage
  //           });
  //           this.getAllDifFiles();
  //         }
  //       });
  //     }
  //   });
  // }

  allDelete() {
    // Prepare the payload with the filenames of the selected products
    const payload = {
      filenames: this.selectedProducts.map(product => product.dcrFileName)
    };
  
    // Show a confirmation dialog to the user
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected items?',
      accept: () => {
        // Proceed with deletion if confirmed
        this.difService.deleteByDifId(payload)
          .subscribe({
            next: (res) => {
              // Check if the response indicates success
              if (res && res.responseStatus === 'success') {
                // Notify the user of successful deletion
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: res.responseMessage || 'Items deleted successfully.'
                });
                // Refresh the list of DCR files
                this.getAllDcrFiles();
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
              // Handle any server errors
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
