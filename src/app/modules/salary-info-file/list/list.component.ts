import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  products!: any;
  selectedProducts!: any;
  value!: any
  constructor(private commonService: CommonService,
    private router: Router) { }

  ngOnInit() {
    this.commonService.getProductsMini().then((data) => {
      console.log(data)
      this.products = data;
    });
  }

  addSFI(){
    this.router.navigate(['add']);
  }
}
