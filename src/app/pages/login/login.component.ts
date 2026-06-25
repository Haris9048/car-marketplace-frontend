import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  errorMessage = '';

  loginForm;

  constructor(
    private api: ApiService,
    private router: Router,
    private fb: FormBuilder
  ) {

    this.loginForm = this.fb.group({

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        Validators.required
      ]

    });

  }

  login() {

    this.errorMessage = '';

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;

    }

    this.api.login(
      this.loginForm.value
    ).subscribe({

      next: (res: any) => {

        localStorage.setItem(
          'token',
          res.token
        );

        localStorage.setItem(
          'user',
          JSON.stringify(res.user)
        );

        window.location.reload();

      },

      error: () => {

        this.errorMessage =
          'Invalid email or password';

      }

    });

  }

}