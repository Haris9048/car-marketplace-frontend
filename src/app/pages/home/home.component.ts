import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  cars: any[] = [];
  currentUser: any = null;

  constructor(private api: ApiService) {}

  ngOnInit() {
    // ✅ get logged-in user
    const user = localStorage.getItem("user");
    if (user) {
      this.currentUser = JSON.parse(user);
    }

    // ✅ load cars
    this.loadCars();
  }

  // ✅ separate function (important)
  loadCars() {
    this.api.getCars().subscribe((res: any) => {
      this.cars = res;
    });
  }

  // ✅ delete
 deleteCar(id: string) {
  this.api.deleteCar(id).subscribe({
    next: () => this.loadCars(),
    error: (err) => alert(err.error.message)
  });
}

}