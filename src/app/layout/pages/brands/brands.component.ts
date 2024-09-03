import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../../shared/services/brands/brands.service';
import { IBrandData } from '../../../shared/interfaces/ibrands';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
  imports:[RouterLink]
})
export class BrandsComponent implements OnInit {
  private readonly _BrandsService = inject(BrandsService);
  allBrands: IBrandData[] = [];

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('currentPage', '/brands');
    }
    this.getAllBrands();
  }

  getAllBrands(): void {
    this._BrandsService.getAlBrands().subscribe({
      next: (res) => {
        this.allBrands = res.data;
        console.log(this.allBrands);
      }
    });
  }
}
