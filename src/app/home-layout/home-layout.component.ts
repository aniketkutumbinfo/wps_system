import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/services/common.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {

  constructor(public commonService: CommonService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router,
  ) {
    this.commonService.getProfileUser()
      .subscribe(res => {
        if (res.responseStatus === 'success') {
        }
      })
  }
  ngAfterViewChecked() {
    //your code to update the model
    this.cdr.detectChanges();
  }

  updateProfile(): void {
    // Navigate to the profile update page
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.authService.logout(); // Implement this method in AuthService
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {

  }
}
