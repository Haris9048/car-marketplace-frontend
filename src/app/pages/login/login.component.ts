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

if (!this.email.includes('@')) {
  this.errorMessage = 'Invalid email';
  return;
}


if (this.password.length < 8) {
  this.errorMessage = 'Password must be at least 8 characters';
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
        alert(err.error.message);
      }
    });
}
}
