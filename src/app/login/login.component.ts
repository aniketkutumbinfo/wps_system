import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../shared/services/common.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: '',
  };
  // rememberMe: false
  constructor(private router: Router,
    private commonService: CommonService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

  }

  onLogin() {
    // Validate email and password
    if (!this.user.email || !this.user.password) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'Please enter both email and password'
      });
      return;
    }

    console.log('User:', this.user);

    this.commonService.login(this.user)
      .subscribe({
        next: (res) => {
          if (res.responseStatus === 'success') {
            // Assuming res.responseData is an object
            const responseData = res.responseData;
            // Convert the object to a JSON string
            const responseDataString = JSON.stringify(responseData);
            // Store the string in localStorage
            localStorage.setItem('userData', responseDataString);
            // Navigate to the dashboard
            this.router.navigate(['/dashboard']);
            console.log('Navigated to dashboard');
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Login Error',
              detail: 'Invalid email or password'
            });
          }
        },
        error: (err) => {
          console.error('Login error:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Server Error',
            detail: 'An error occurred while logging in. Please try again later.'
          });
        }
      });
  }

}
