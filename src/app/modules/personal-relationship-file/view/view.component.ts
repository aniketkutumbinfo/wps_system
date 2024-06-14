import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonalRelationshipService } from '../personal-relationship.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  itemId: any;
  prcDetail: any;
  constructor(private prcService: PersonalRelationshipService,
    private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.itemId = params.get('id'); // The '+' operator converts the string to a number
      // Fetch and display the item details using this.itemId
      if (this.itemId) {
        this.getPrcDetail(this.itemId)
      }
    });
  }

  getPrcDetail(id: any) {
    this.prcService.getPrcFileById(id)
      .subscribe(res => {
        this.prcDetail = res;
        console.log(res)
      })
  }

}
