import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/services/common.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  user: any = {
    fullName: '',
    email: '',
    password: '',
    role: '',
    mobile: ''
  };
  confirmPass = '';
  roles = ['Admin', 'User'];
  constructor(private commonService: CommonService,
    private router: Router,
    private messageService: MessageService
  ) { }

  onSubmit() {
    if (this.user.password === this.confirmPass) {
      this.user.confirmPass = this.confirmPass
      console.log('User:', this.user);
      // Implement actual sign-up logic here, e.g., sending data to a server
      this.commonService.signup(this.user)
        .subscribe(res => {
          if (res.responseStatus === 'success') {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Signup successful! Redirecting to login...'
            });
            this.router.navigate(['/login']);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Signup failed. Please try again.'
            });
          }
        })
    } else {
      console.error('Passwords do not match');
    }
  }
  ngOnInit(): void {

  }
}
