import { Component, OnInit } from '@angular/core';
import { DcrService } from '../dcr.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  itemId: string | null = null;  // Explicit type definition
  dcrDetail: any;  // Consider defining a specific type for DCR details
  private routeSub: Subscription = new Subscription();

  constructor(private dcrService: DcrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Subscribe to route parameters
    this.routeSub.add(this.route.paramMap.subscribe(params => {
      this.itemId = params.get('id');
      if (this.itemId) {
        this.getPafDetail(this.itemId);
      }
    }));
  }

  getPafDetail(id: string): void {
    this.dcrService.getRecDcrById(id).subscribe({
      next: (res: any) => {
        if (res.responseStatus === 'success') {
          this.dcrDetail = res.responseData;
        } else {
          console.error('Failed to fetch details:', res.responseMessage); // Log error message or handle accordingly
        }
      },
      error: (err: any) => {
        console.error('Error fetching DCR details:', err);  // Log error message or handle accordingly
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();  // Clean up subscriptions
  }
}
