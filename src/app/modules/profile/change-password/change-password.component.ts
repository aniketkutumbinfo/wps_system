import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { MustMatch } from './must-match.validator';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder,
    private passwordService: ProfileService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      oldPass: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('newPassword', 'confirmPassword')
    });
  }

  get oldPass() {
    return this.changePasswordForm.get('oldPass');
  }

  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.changePasswordForm.get('confirmPassword');
  }

  onSubmit(): void {
    if (this.changePasswordForm.valid) {
      const { oldPass, newPassword } = this.changePasswordForm.value;

      this.passwordService.changePassword(oldPass, newPassword).subscribe({
        next: res => {
          // Handle response based on responseStatus or other data
          if (res.responseStatus === 'success') {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Password changed successfully'
            });
            // Optionally, redirect or perform additional actions here
            this.changePasswordForm.reset()
          } else if (res.responseStatus === 'failure') {
            this.messageService.add({
              severity: 'warn',
              summary: 'Failure',
              detail: 'Failed to change password. Please check your input and try again.'
            });
          } else if (res.responseStatus === 'error') {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: res.errorMessage || 'An unexpected error occurred. Please try again later.'
            });
          } else {
            this.messageService.add({
              severity: 'info',
              summary: 'Info',
              detail: 'Unexpected response status. Please contact support if this issue persists.'
            });
          }
        },
        error: err => {
          // Handle error
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error changing password. Please try again.'
          });
          console.error('Error changing password:', err);
        }
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Invalid Form',
        detail: 'Please fill out the form correctly.'
      });
    }
  }
}
