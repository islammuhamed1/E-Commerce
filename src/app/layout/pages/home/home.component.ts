import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/products/products.service';
import { IProductDetails } from '../../../shared/interfaces/iproducts';
import { CategorySliderComponent } from '../../audditions/category-slider/category-slider.component';
import { HomesliderComponent } from '../../../shared/audditions/homeslider/homeslider.component';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CategorySliderComponent,
    HomesliderComponent,
    RouterLink,
    SearchPipe,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

  private readonly _ProductService = inject(ProductService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _WishlistService = inject(WishlistService);
  private readonly _NgxSpinnerService = inject(NgxSpinnerService);
  productList!: IProductDetails[];
  searching: string = '';
  wishList: string[]=[];
  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/home');
    }
    this.getProducts();
 
  }
  getLoggedUsersWishList(){
    this._WishlistService.getLoggedWishList().subscribe({
      next: (res) => {
        const adjustData = res.data.map((item:any) => item._id);
        this.wishList = adjustData;
        console.log(adjustData);
      },
      error:e=>{
        console.log(e);
        
      }
    })
  }
  getProducts() {
    this._ProductService.getAllProducts().subscribe({
      next: (res) => {
        this.productList = res.data;
        console.log(this.productList);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  addProductToCart(productId: string) {
    this._CartService.addProductToCart(productId).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, '', {
          progressBar: true,
          positionClass: 'toast-bottom-right',
          
        });

        console.log(res);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  addToWishList(id:string):void{
    this._WishlistService.addProductToWishList(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, '', {
          progressBar: true,
          positionClass: 'toast-bottom-right',
          
        });
        this.wishList=res.data;
        console.log(res);
      },
      error:e=>{
        console.log(e);
        
      }
    })
  }
  removeFromWishList(id:string):void{
    this._WishlistService.removeProductFromWishList(id).subscribe({
      next: (res) => {
        this._ToastrService.error(res.message, '', {
          progressBar: true,
          positionClass: 'toast-bottom-right',
          
        });
        this.wishList=res.data;
        const newAdjsutData = this.productList.filter((item:any)=> this.wishList.includes(item._id));
        this.productList = newAdjsutData;
        console.log(this.wishList);
        
      },
      error:e=>{
        console.log(e);
        
      }
    })
  }
}
