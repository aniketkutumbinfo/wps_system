import { Component, OnInit } from '@angular/core';
import { PersonalInformationService } from '../personal-information.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// Define interfaces for better type safety
interface PafFile {
  pafFileId: number;
  // Add other relevant properties here
}

interface PafFilesResponse {
  responseStatus: string;
  responseData: PafFile[];
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  getAllPafFilesList: PafFile[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private pifService: PersonalInformationService, private router: Router) { }

  ngOnInit() {
    this.getAllPafFiles();
  }

  getAllPafFiles() {
    this.isLoading = true;
    this.pifService.getAllPafFiles().pipe(
      tap((res: PafFilesResponse) => {
        if (res.responseStatus === 'success') {
          this.getAllPafFilesList = res.responseData;
        } else {
          this.error = 'Failed to load files';
        }
      }),
      catchError(err => {
        this.error = 'An error occurred while fetching files';
        return [];
      }),
      tap(() => this.isLoading = false)
    ).subscribe();
  }

  viewPrcDetail(data: PafFile) {
    this.router.navigate(['/pif/view', data.pafFileId]);
  }
}
