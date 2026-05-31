import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddCarComponent } from './pages/add-car/add-car.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CarDetailComponent } from './pages/car-detail/car-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddCarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
  path: 'car/:id',
  component: CarDetailComponent
}
  
  
];