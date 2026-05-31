import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-detail',
  imports: [CommonModule],
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css'
})
export class CarDetailComponent implements OnInit {

  car: any;
  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ){}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.api.getCar(id!).subscribe((res) => {
  this.car = res;
});

    
  }


}
