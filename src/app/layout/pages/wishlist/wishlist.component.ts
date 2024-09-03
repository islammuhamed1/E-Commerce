import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';
import { IProductDetails } from '../../../shared/interfaces/iproducts';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink, SearchPipe, FormsModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  private readonly _WishlistService = inject(WishlistService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  productList!: IProductDetails[];
  searching!: string;
  wishList: string[]=[];
  ngOnInit(): void {
    this._WishlistService.getLoggedWishList().subscribe({
      next: (res) => {
        console.log('API Response:', res);
        this.productList = res.data; 
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
          positionClass: 'toast-top-right',
        });
        console.log(res);
        this.productList = res.data;
      },
      error: (e) => {
        console.log(e);
      },
    });
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
