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
  itemId: string | null = null;
  txnDetail: any | null = null;

  constructor(
    private commonService: CommonService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.itemId = params.get('id'); 
      if (this.itemId) {
        this.getTxnDetail(this.itemId);
      }
    });
  }

  getTxnDetail(id: string): void {
    this.commonService.getTranscationsRecords(id)
      .subscribe({
        next: (res) => {
          if (res.responseStatus === 'success') {
            this.txnDetail = res.responseData;
          } else {
            this.handleError('Failed to load transaction details.');
          }
        },
        error: (err) => {
          this.handleError('An error occurred while fetching transaction details.');
        }
      });
  }

  updateCase(): void {
    if (this.txnDetail) {
      this.commonService.updateTransaction(this.txnDetail)
        .subscribe({
          next: (res) => {
            if (res.responseStatus === 'success') {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Transaction updated successfully!'
              });
              this.router.navigate(['/dif/transaction']);
            } else {
              this.handleError('Transaction update failed. Please try again.');
            }
          },
          error: (err) => {
            this.handleError('An error occurred while updating the transaction.');
          }
        });
    } else {
      this.handleError('Transaction details are missing.');
    }
  }

  private handleError(message: string): void {
    console.error(message);
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message
    });
  }
}
