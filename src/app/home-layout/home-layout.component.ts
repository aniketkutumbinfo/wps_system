import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent {

  constructor(public commonService: CommonService,
    private cdr: ChangeDetectorRef
  ) { }
  ngAfterViewChecked() {
    //your code to update the model
    this.cdr.detectChanges();
  }
}
