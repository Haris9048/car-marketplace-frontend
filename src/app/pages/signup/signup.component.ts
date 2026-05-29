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

  constructor(private api: ApiService, private router: Router) {}

  signup() {
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
      alert(err.error.message); // 👈 show backend message
    }
  });
}}