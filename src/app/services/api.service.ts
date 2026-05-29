import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {

  baseUrl = "https://car-marketplace1.onrender.com";

  constructor(private http: HttpClient) {}

  // 🔐 headers
  getHeaders() {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  signup(data: any) {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  login(data: any) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  getCars() {
    return this.http.get(`${this.baseUrl}/cars`);
  }

  addCar(data: any) {
    return this.http.post(`${this.baseUrl}/cars`, data, this.getHeaders());
  }

  deleteCar(id: string) {
    return this.http.delete(`${this.baseUrl}/cars/${id}`, this.getHeaders());
  }
}