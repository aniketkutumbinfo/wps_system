import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonalInformationService } from '../personal-information.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  itemId: any;
  pafDetail: any;
  constructor(private pifService: PersonalInformationService,
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
    this.pifService.getPafFileById(id)
      .subscribe(res => {
        this.pafDetail = res[0];
        console.log(res)
      })
  }
}
