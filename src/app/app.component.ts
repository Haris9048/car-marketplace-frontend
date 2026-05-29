import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  template: `

  <!-- Navbar -->
  <nav class="bg-white shadow px-6 py-4 flex justify-between items-center">

    <h1 class="text-xl font-bold">CarMarket</h1>

    <div class="space-x-4">

      <a routerLink="/" class="text-gray-700 hover:text-black">Home</a>

      <!-- NOT LOGGED IN -->
      <ng-container *ngIf="!user">
        <a routerLink="/login" class="text-gray-700">Login</a>
        <a routerLink="/signup" class="text-gray-700">Signup</a>
      </ng-container>

      <!-- LOGGED IN -->
      <ng-container *ngIf="user">
        <a routerLink="/add" class="bg-black text-white px-4 py-2 rounded">
          Add Car
        </a>

        <span class="text-gray-600">
          {{user.name}}
        </span>

        <button (click)="logout()" class="text-red-500">
          Logout
        </button>
      </ng-container>

    </div>

  </nav>

  <!-- Pages -->
  <div class="p-4">
    <router-outlet></router-outlet>
  </div>

  `
})
export class AppComponent {

  user: any = null;

  constructor(private router: Router) {}

  ngOnInit() {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  logout() {
    localStorage.removeItem("user");
    this.user = null;
    this.router.navigate(['/login']);
  }
}