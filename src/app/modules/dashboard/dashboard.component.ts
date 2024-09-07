import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';  // Adjust the path if necessary

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dcrStatus: any;
  difStatus: any;
  pafStatus: any;
  prcStatus: any;
  rfaStatus: any;
  txnStatus: any;
  dcrCount: any;
  difCount: any;
  pafCount: any;
  prcCount: any;
  rfaCount: any;

  loading = true;
  error: string | null = null;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadStatusAndCounts();
  }

  loadStatusAndCounts(): void {
    // Reset error and loading state
    this.error = null;
    this.loading = true;

    // Fetch status
    this.dashboardService.getDCRStatus().subscribe(
      data => this.dcrStatus = data,
      error => this.handleError('Error fetching DCR Status', error)
    );

    this.dashboardService.getDIFStatus().subscribe(
      data => this.difStatus = data,
      error => this.handleError('Error fetching DIF Status', error)
    );

    this.dashboardService.getPAFStatus().subscribe(
      data => this.pafStatus = data,
      error => this.handleError('Error fetching PAF Status', error)
    );

    this.dashboardService.getPRCStatus().subscribe(
      data => this.prcStatus = data,
      error => this.handleError('Error fetching PRC Status', error)
    );

    this.dashboardService.getRFAStatus().subscribe(
      data => this.rfaStatus = data,
      error => this.handleError('Error fetching RFA Status', error)
    );

    this.dashboardService.getTXNStatus().subscribe(
      data => this.txnStatus = data,
      error => this.handleError('Error fetching TXN Status', error)
    );

    // Fetch counts
    this.dashboardService.getDCRCount().subscribe(
      data => this.dcrCount = data,
      error => this.handleError('Error fetching DCR Count', error)
    );

    this.dashboardService.getDIFCount().subscribe(
      data => this.difCount = data,
      error => this.handleError('Error fetching DIF Count', error)
    );

    this.dashboardService.getPAFCount().subscribe(
      data => this.pafCount = data,
      error => this.handleError('Error fetching PAF Count', error)
    );

    this.dashboardService.getPRCCount().subscribe(
      data => this.prcCount = data,
      error => this.handleError('Error fetching PRC Count', error)
    );

    this.dashboardService.getRFACount().subscribe(
      data => this.rfaCount = data,
      error => this.handleError('Error fetching RFA Count', error)
    );
  }

  handleError(message: string, error: any): void {
    this.error = message;
    console.error(message, error);
    this.loading = false; // Ensure loading state is updated
  }
}
