import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../../department.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { MessageService } from 'primeng/api';

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

  updateCase(): void {
    this.commonService.updateTransaction(this.txnDetail)
      .subscribe({
        next: (res) => {
          if (res.responseStatus === 'success') {
            // Optionally show a success message
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Transaction updated successfully!'
            });

            // Navigate to the transaction overview page
            this.router.navigate(['/dif/transaction']);
          } else {
            // Show an error message if response status is not success
            this.handleError('Transaction update failed. Please try again.');
          }
        },
        error: (err) => {
          // Handle any errors that occurred during the request
          this.handleError('An error occurred while updating the transaction.');
        }
      });
  }

  private handleError(message: string): void {
    console.error(message);
    // Show a user-friendly error message using a message service or a notification system
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message
    });
  }


}
