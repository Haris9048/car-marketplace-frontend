import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  email = '';
  password = '';
  errorMessage = '';

  constructor(private api: ApiService, private router: Router) {}

  login() {
    console.log("Login clicked");

    if (this.email.trim() === '') {
  this.errorMessage = 'Email is required';
  return;
}

if (this.password.trim() === '') {
  this.errorMessage = 'Password is required';
  return;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(this.email)) {
  this.errorMessage = 'Invalid email format';
  return;
}

 console.log("Validation passed");
  this.api.login({ email: this.email, password: this.password })
    .subscribe({
      next: (res: any) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        window.location.reload();
      },
      error: (err) => {
        this.errorMessage = 'Invalid email or password';
      }
    });
}
}
