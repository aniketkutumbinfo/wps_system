import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonalInformationService } from '../../personal-information.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rfa-view',
  templateUrl: './rfa-view.component.html',
  styleUrls: ['./rfa-view.component.scss']
})
export class RfaViewComponent implements OnInit, OnDestroy {
  itemId: string | null = null; // Use a more specific type
  rfaDetail: any; // Define a proper type based on the expected structure
  private routeSub: Subscription = new Subscription();
  private rfaSub: Subscription = new Subscription();
  loading: boolean = false;
  error: string | null = null; // Error handling

  constructor(
    private pifService: PersonalInformationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      this.itemId = params.get('id');
      if (this.itemId) {
        this.getRfaDetail(this.itemId);
      }
    });
  }

  getRfaDetail(id: string): void {
    this.loading = true;
    this.rfaSub = this.pifService.getRfaFileById(id).subscribe(
      res => {
        this.loading = false;
        if (res.responseStatus === 'success') {
          this.rfaDetail = res.responseData;
        } else {
          this.error = 'Failed to load data';
        }
      },
      error => {
        this.loading = false;
        this.error = 'An error occurred: ' + error.message;
      }
    );
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.rfaSub.unsubscribe();
  }
}
