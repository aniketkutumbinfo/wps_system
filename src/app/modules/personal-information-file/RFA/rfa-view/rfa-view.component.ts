import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonalInformationService } from '../../personal-information.service';

@Component({
  selector: 'app-rfa-view',
  templateUrl: './rfa-view.component.html',
  styleUrls: ['./rfa-view.component.scss']
})
export class RfaViewComponent implements OnInit {
  itemId: any;
  rfaDetail: any;
  constructor(private pifService: PersonalInformationService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.itemId = params.get('id'); // The '+' operator converts the string to a number
      // Fetch and display the item details using this.itemId
      if (this.itemId) {
        this.getRfaDetail(this.itemId)
      }
    });
  }

  getRfaDetail(id: any) {
    this.pifService.getRfaFileById(id)
      .subscribe(res => {
        if (res.responseStatus === 'success') {
          this.rfaDetail = res.responseData;
        }
      })
  }

}
