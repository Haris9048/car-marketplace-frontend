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

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    const user = localStorage.getItem("user");

    // 🔐 protect route
    if (!user) {
      this.router.navigate(['/login']);
    }
  }

  addCar() {
  this.api.addCar({
    title: this.title,
    price: this.price
  }).subscribe(() => {
    alert("Car added");
    this.router.navigate(['/']);
  });
}
}