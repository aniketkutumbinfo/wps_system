import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  isEditing = false;
  roles = [
    { value: 'Admin', label: 'Admin' },
    { value: 'User', label: 'User' }
    // Add more roles as needed
  ];

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private messageService: MessageService
  ) {
    this.profileForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.commonService.getProfileUser()
      .subscribe({
        next: (res) => {
          if (res.responseStatus === 'success') {
            this.profileForm.setValue(res.responseData);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to load profile data.'
            });
          }
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Server Error',
            detail: 'Error fetching profile data. Please try again later.'
          });
        }
      });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    this.isEditing ? this.profileForm.enable() : this.profileForm.disable();
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.commonService.updateProfile(this.profileForm.value)
        .subscribe({
          next: (res) => {
            if (res.responseStatus === 'success') {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Profile updated successfully.'
              });
              this.toggleEdit();
              this.loadProfile(); // Reload profile data to reflect changes
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to update profile.'
              });
            }
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Server Error',
              detail: 'Error updating profile. Please try again later.'
            });
          }
        });
    } else {
      this.messageService.add({
        severity: 'warning',
        summary: 'Validation Error',
        detail: 'Please fill in all required fields.'
      });
    }
  }
}
