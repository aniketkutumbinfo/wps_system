import { Component, OnInit } from '@angular/core';
import { PersonalRelationshipService } from '../personal-relationship.service';
import { Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';

interface PrcFile {
  prcFileId: number;
  prcFileName: string;
  fileReason: string;
  fileStatus: string;
  fileCreationDate: string;
  makerDate: string;
  // Define other fields if needed
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  getAllPrcFilesList: PrcFile[] = []; // Use PrcFile type instead of any

  constructor(
    private prfService: PersonalRelationshipService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllPrcFiles();
  }

  getAllPrcFiles(): void {
    this.prfService.getAllPrcFiles()
      .pipe(
        catchError(err => {
          console.error('Error fetching PRC files:', err);
          return of({ responseStatus: 'error', responseData: [] }); // Return an empty array in case of error
        })
      )
      .subscribe(res => {
        if (res.responseStatus === 'success') {
          this.getAllPrcFilesList = res.responseData;
        } else {
          // Handle unexpected response status
          console.warn('Unexpected response status:', res.responseStatus);
        }
      });
  }

  viewPrcDetail(data: PrcFile): void {
    this.router.navigate(['/prf/view', data.prcFileId]);
  }
}
