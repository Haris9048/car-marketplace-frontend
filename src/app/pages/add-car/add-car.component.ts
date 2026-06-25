import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './add-car.component.html'
})
export class AddCarComponent implements OnInit {

  selectedFile: File | null = null;

  errorMessage = '';
  successMessage = '';

  carForm;

  constructor(
    private api: ApiService,
    private router: Router,
    private fb: FormBuilder
  ) {

    this.carForm = this.fb.group({

      title: ['', Validators.required],

      price: [
        '',
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      description: [''],

      brand: ['', Validators.required],

      model: ['', Validators.required],

      year: [
        '',
        Validators.required
      ],

      fuelType: [
        '',
        Validators.required
      ]

    });

  }

  ngOnInit() {

    const user = localStorage.getItem('user');

    if (!user) {
      this.router.navigate(['/login']);
    }

  }

  onFileSelected(event: any) {

    this.selectedFile =
      event.target.files[0];

  }

  addCar() {

    this.errorMessage = '';
    this.successMessage = '';

    if (this.carForm.invalid) {

      this.carForm.markAllAsTouched();

      return;

    }

    if (!this.selectedFile) {

      this.errorMessage =
        'Image is required';

      return;

    }

    const formData = new FormData();

    formData.append(
      'image',
      this.selectedFile
    );

    this.api.uploadImage(formData)
      .subscribe({

        next: (uploadRes: any) => {

          this.api.addCar({

            ...this.carForm.value,

            imageUrl:
              uploadRes.imageUrl

          }).subscribe({

            next: () => {

              this.successMessage =
                'Car added successfully';

              this.router.navigate(['/']);

            },

            error: () => {

              this.errorMessage =
                'Failed to add car';

            }

          });

        },

        error: () => {

          this.errorMessage =
            'Image upload failed';

        }

      });

  }

}