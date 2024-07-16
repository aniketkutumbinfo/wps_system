import { Component, OnInit } from '@angular/core';
import { DcrService } from '../dcr.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ack-ack-detail',
  templateUrl: './ack-ack-detail.component.html',
  styleUrls: ['./ack-ack-detail.component.scss']
})
export class AckAckDetailComponent implements OnInit {
  itemId: any;
  ackNakDetail: any;
  constructor(private dcrService: DcrService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.itemId = params.get('id'); // The '+' operator converts the string to a number
      // Fetch and display the item details using this.itemId
      if (this.itemId) {
        this.getPafDetail(this.itemId)
      }
    });
  }

  getPafDetail(id: any) {
    this.dcrService.getAckNakForFileName(id,'')
      .subscribe(res => {
        this.ackNakDetail = res;
        console.log(res)
      })
  }

}
