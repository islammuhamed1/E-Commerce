import { Component, OnInit, inject } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { DataRes, ICart } from '../../../shared/interfaces/icart';
import { Data, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService);
  data: DataRes = {} as DataRes

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('currentPage', '/carts');
    }
    this.getLoggedUserCart();
  }

  getLoggedUserCart() {
    this._CartService.getLoggedUserCart().subscribe({
      next: res => {
        this.data = res.data;
        console.log(this.data);
      },
      error: e => {
        console.log(e);
      }
    });
  }
 
  
  
  updateProductCartCount(productId: string, count: number) {
    if (count>=0) {
      this.deleteProductFromCart(productId);
    }
    this._CartService.updateProductCart(productId, count.toString()).subscribe({
      next: res => {
        console.log(res);
        this.data = res.data;
      },
      error: e => {
        console.log(e);
        
      }
    });
  }
  deleteProductFromCart(productId:string){
    this._CartService.removeProductFromCart(productId).subscribe({
      next : res =>{
        console.log(res);
        this.data = res.data;

      },
      error : e =>{
        console.log(e);
        
      }
    })
  }
  }
  

