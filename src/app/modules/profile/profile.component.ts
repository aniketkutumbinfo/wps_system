import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  isEditing: boolean = false;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      position: ['', [Validators.required]],
      company: ['', [Validators.required]],
      address: ['']
    });
  }

  ngOnInit(): void {
    // Mock data for demonstration purposes
    this.profileForm.setValue({
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      position: 'Software Engineer',
      company: 'TechCorp Inc.',
      address: '1234 Elm Street, Springfield, USA'
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  onSubmit() {
    if (this.profileForm.valid) {
      // Handle form submission
      console.log('Profile updated:', this.profileForm.value);
      this.toggleEdit();
    }
  }

}
