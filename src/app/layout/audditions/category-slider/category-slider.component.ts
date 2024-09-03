import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/category/category.service';
import { ICategoryDetails } from '../../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.css'
})
export class CategorySliderComponent implements OnInit {
  private readonly _CategoryService = inject(CategoryService)
  categoryList!:ICategoryDetails[];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 7
      },
    },
    nav: true
  }
slide: any;
  ngOnInit(): void {
    this.getAllCategories()
  }
  getAllCategories(){
    this._CategoryService.getAllCategories().subscribe({
      next: res =>{
        this.categoryList = res.data
        console.log(this.categoryList);
        
      },
      error: e =>{
        console.log(e);
        
      }
    })
  }
}
