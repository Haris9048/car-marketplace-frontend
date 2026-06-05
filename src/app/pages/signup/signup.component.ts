import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html'
})
export class SignupComponent {

  name = '';
  email = '';
  password = '';
  errorMessage = '';

  constructor(private api: ApiService, private router: Router) {}

  signup() {

  this.errorMessage = '';

  if (this.name.trim() === '') {
    this.errorMessage = 'Name is required';
    return;
  }

  if (!this.email.includes('@')) {
    this.errorMessage = 'Enter a valid email';
    return;
  }

  if (this.password.length < 8) {
    this.errorMessage = 'Password must be at least 8 characters';
    return;
  }

  this.api.signup({
    name: this.name,
    email: this.email,
    password: this.password
  }).subscribe({
    next: () => {
      alert("Signup successful");
      this.router.navigate(['/login']);
    },
    error: (err) => {
      this.errorMessage = err.error.message;
    }
  });

}}