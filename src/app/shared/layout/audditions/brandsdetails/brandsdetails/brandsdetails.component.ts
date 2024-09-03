import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandsService } from '../../../../services/brands/brands.service';
import { IBrandData, IBrands } from '../../../../interfaces/ibrands';

@Component({
  selector: 'app-brandsdetails',
  standalone: true,
  imports: [],
  templateUrl: './brandsdetails.component.html',
  styleUrl: './brandsdetails.component.css'
})
export class BrandsdetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _BrandsService = inject(BrandsService);
  brandsDetails: IBrandData[] = [];
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: res=>{
        let idBrand = res.get('id')
        this._BrandsService.getSpecificBrand(idBrand).subscribe({
          next:res=>{
            this.brandsDetails = [res.data];
          }
        })
      }
    })
    
  }
  
}
