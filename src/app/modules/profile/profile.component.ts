import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  isEditing: boolean = false;
  profileData: any
  constructor(private fb: FormBuilder,
    private commonService: CommonService
  ) {
    this.profileForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Mock data for demonstration purposes
    this.commonService.getProfileUser()
      .subscribe(res => {
        if (res.responseStatus === 'success') {
          this.profileData = res.responseData
          console.log(this.profileData)
          this.profileForm.setValue(
            {
              fullName: this.profileData.fullName,
              email: this.profileData.email,
              mobile: this.profileData.mobile,
              role: this.profileData.role,
            }
          );
        }
      })
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  onSubmit() {
    if (this.profileForm.valid) {
      // Handle form submission
      console.log('Profile updated:', this.profileForm.value);
      this.commonService.updateProfile(this.profileForm.value)
        .subscribe(res => {
          if (res.responseStatus === 'success') {
            this.toggleEdit();
          }
        })
    }
  }

}
