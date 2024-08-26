import { Component, OnInit, OnDestroy } from '@angular/core';
import { DepartmentService } from '../department.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {
  itemId: number | null = null;
  difDetail: any; // Consider defining an interface for difDetail
  private paramMapSubscription: Subscription | undefined;

  constructor(private difService: DepartmentService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.paramMapSubscription = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.itemId = id ? +id : null; // Convert id to number
      if (this.itemId) {
        this.getPafDetail(this.itemId);
      }
    });
  }

  getPafDetail(id: number): void {
    this.difService.getRecDifById(id).subscribe({
      next: (res) => {
        if (res.responseStatus === 'success') {
          this.difDetail = res.responseData;
        } else {
          // Handle error or show a message to the user
          console.error('Failed to fetch details:', res.responseMessage);
        }
      },
      error: (err) => {
        // Handle error from the HTTP request
        console.error('Error fetching details:', err);
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.paramMapSubscription) {
      this.paramMapSubscription.unsubscribe();
    }
  }
}
