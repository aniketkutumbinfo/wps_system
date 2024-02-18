import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  products!: any;
  selectedProducts!: any;
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.commonService.getProductsMini().then((data) => {
      console.log(data)
      this.products = data;
    });
  }
}
