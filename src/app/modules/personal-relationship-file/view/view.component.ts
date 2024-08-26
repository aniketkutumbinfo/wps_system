import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonalRelationshipService } from '../personal-relationship.service';
import { Observable, catchError, of } from 'rxjs';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  itemId?: any; // Use number if ID is numeric, otherwise keep it as string
  prcDetail?: any;

  constructor(
    private prcService: PersonalRelationshipService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.itemId = params.get('id'); // Convert to number if applicable
      if (this.itemId) {
        this.getPrcDetail(this.itemId);
      }
    });
  }

  getPrcDetail(id: number): void {
    this.prcService.getPrcFileById(id)
      .pipe(
        catchError(err => {
          console.error('Error fetching PRC file details:', err);
          return of({ responseStatus: 'error', responseData: [] }); // Return an empty array in case of error
        })
      )
      .subscribe(res => {
        if (res.responseStatus === 'success') {
          this.prcDetail = res.responseData[0]; // Adjust as needed if responseData is not an array
        } else {
          console.warn('Failed to fetch PRC details:', res.responseStatus);
        }
      });
  }
}
