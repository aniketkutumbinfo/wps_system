import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-update-transaction',
  templateUrl: './update-transaction.component.html',
  styleUrls: ['./update-transaction.component.scss']
})
export class UpdateTransactionComponent implements OnInit {

  itemId: any;
  txnDetail: any = {};

  constructor(private commonService: CommonService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    public router: Router) {
    this.route.paramMap.subscribe(params => {
      this.itemId = params.get('id'); // The '+' operator converts the string to a number
      // Fetch and display the item details using this.itemId
      if (this.itemId) {
        this.getTxnDetail(this.itemId)
      }
    });
  }

  ngOnInit() {
    console.log(this.txnDetail)
  }

  getTxnDetail(id: any) {
    this.commonService.getTranscationsRecords(id)
      .subscribe(res => {
        if (res.responseStatus === 'success') {
          this.txnDetail = res.responseData;
          console.log(this.txnDetail)
        }
      })
  }

  updateCase() {
    // Call the service method to update the transaction details
    this.commonService.updateTransaction(this.txnDetail)
      .subscribe({
        next: (res) => {
          // Check if the response indicates success
          if (res && res.responseStatus === 'success') {
            // Notify user of successful update
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Transaction updated successfully.'
            });
            // Navigate to the transaction list page
            this.router.navigate(['/dcr/transaction']);
          } else {
            // Notify user of failure
            this.messageService.add({
              severity: 'error',
              summary: 'Update Failed',
              detail: 'Failed to update transaction. Please try again.'
            });
          }
        },
        error: (err) => {
          // Handle any errors from the server
          console.error('Transaction update error:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Server Error',
            detail: 'An error occurred while updating the transaction. Please try again later.'
          });
        }
      });
  }
  

}
