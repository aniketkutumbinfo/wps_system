import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../shared/services/common.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  token: string | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (!this.token) {
        this.errorMessage = 'Invalid token. Please request a new password reset link.';
      }
    });
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword');
    const confirmPass = formGroup.get('confirmPass');

    if (newPassword && confirmPass) {
      return newPassword.value === confirmPass.value ? null : { mismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid && this.token) {
      const newPassword = this.resetPasswordForm.get('newPassword')?.value;
      const confirmPass = this.resetPasswordForm.get('confirmPass')?.value;

      if (newPassword !== confirmPass) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Password Mismatch',
          detail: 'The new password and confirmation password do not match.'
        });
        return;
      }

      this.commonService.resetPassword(this.token, { newPassword, confirmPass }).subscribe({
        next: res => {
          // Handle different response statuses
          if (res.responseStatus === 'success') {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Password successfully reset.'
            });
            this.router.navigate(['/login']); // Redirect to login or other page
          } else if (res.responseStatus === 'failure') {
            this.messageService.add({
              severity: 'warn',
              summary: 'Failure',
              detail: res.message || 'Failed to reset password. Please try again.'
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
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error resetting password. Please try again.'
          });
          console.error('Error resetting password', err);
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
