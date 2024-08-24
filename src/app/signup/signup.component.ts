import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  user = {
    name: '',
    email: '',
    password: '',
  };
  confirmPassword = '';
  onSubmit() {
    if (this.user.password === this.confirmPassword) {
      console.log('User:', this.user);
      // Implement actual sign-up logic here, e.g., sending data to a server
    } else {
      console.error('Passwords do not match');
    }
  }
}
