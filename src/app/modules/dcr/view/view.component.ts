import { Component, OnInit } from '@angular/core';
import { DcrService } from '../dcr.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  itemId: any;
  difDetail: any;
  constructor(private difService: DcrService,
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
    this.difService.getRecDcrById(id)
      .subscribe(res => {
        this.difDetail = res;
        console.log(res)
      })
  }

}
