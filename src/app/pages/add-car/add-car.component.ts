import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-car.component.html'
})
export class AddCarComponent implements OnInit {

  title = '';
  price: number = 0;
  description = '';
  brand = '';
  model ='';
  year: number = 0;
  fuelType ='';
  imageUrl='';
  selectedFile: File | null = null;

  onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}


  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    const user = localStorage.getItem("user");

    // 🔐 protect route
    if (!user) {
      this.router.navigate(['/login']);
    }
  }

 addCar() {

  if (!this.selectedFile) {
    alert("Please select an image");
    return;
  }

  const formData = new FormData();

  formData.append(
    "image",
    this.selectedFile
  );

  this.api.uploadImage(formData)
    .subscribe((uploadRes: any) => {

      this.api.addCar({

        title: this.title,
        price: this.price,
        description: this.description,
        brand: this.brand,
        model: this.model,
        year: this.year,
        fuelType: this.fuelType,
        imageUrl: uploadRes.imageUrl

      }).subscribe(() => {

        alert("Car added");
        this.router.navigate(['/']);

      });

    });
  }}
