import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, RouterLink } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './signup.component.html'
})
export class SignupComponent {

  errorMessage = '';

  signupForm;

  constructor(
    private api: ApiService,
    private router: Router,
    private fb: FormBuilder
  ) {

    this.signupForm = this.fb.group({

      name: [
        '',
        Validators.required
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ]

    });

  }

  signup() {

    this.errorMessage = '';

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.api.signup(
      this.signupForm.value
    ).subscribe({

      next: () => {

        alert('Signup successful');

        this.router.navigate([
          '/login'
        ]);

      },

      error: (err) => {

        this.errorMessage =
          err.error.message;

      }

    });

  }

}