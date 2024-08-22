import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../../department.service';
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
    this.commonService.updateTranscation(this.txnDetail)
      .subscribe(res => {
        if (res.responseStatus === 'success') {
          this.router.navigate(['/dif/transaction'])
        }
      })
  }

}
