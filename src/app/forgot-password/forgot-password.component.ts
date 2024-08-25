import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../shared/services/common.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private messageService: MessageService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      // Extract the email from the form value
      const email = this.forgotPasswordForm.value.email;

      console.log('Requesting password reset for:', email);

      this.commonService.forgotPassword(this.forgotPasswordForm.value)
        .subscribe({
          next: (res) => {
            if (res.responseStatus === 'success') {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Password reset link has been sent to your email address'
              });
              // Optionally, reset the form
              this.forgotPasswordForm.reset();
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to send password reset link. Please try again.'
              });
            }
          },
          error: (err) => {
            console.error('Password reset error:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Server Error',
              detail: 'An error occurred while sending the reset link. Please try again later.'
            });
          }
        });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'Please enter a valid email address'
      });
    }
  }
}
