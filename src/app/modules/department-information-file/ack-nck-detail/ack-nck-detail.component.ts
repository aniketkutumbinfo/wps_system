import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-ack-nck-detail',
  templateUrl: './ack-nck-detail.component.html',
  styleUrls: ['./ack-nck-detail.component.scss']
})
export class AckNckDetailComponent implements OnInit {
  itemId: any;
  ackNakDetail: any;
  constructor(private departmentService: DepartmentService,
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
    this.departmentService.getAckNakForFileName(id,'')
      .subscribe(res => {
        this.ackNakDetail = res;
        console.log(res)
      })
  }

}
