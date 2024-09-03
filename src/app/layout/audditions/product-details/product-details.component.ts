import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../shared/services/products/products.service';
import { IProducts } from '../../../shared/interfaces/iproducts';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  [x: string]: any;
  private readonly _CartService = inject(CartService)
  private readonly _ProductService = inject(ProductService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ToastrService = inject(ToastrService);

  product!: IProducts;
p: any;
  ngOnInit(): void {
    this.getProductById();
  }
  getProductById() {
    let id:string=''
    this._ActivatedRoute.params.subscribe({
      next : params =>{
        id  = params['id']
      }
    })
    this._ProductService.getProductById(id).subscribe({
      next: (res) => {
        this.product = res.data;
        console.log(this.product);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  // addProductToCart(productId: string) {
  //   this._CartService.addProductToCart(productId).subscribe({
  //     next: (res) => {
  //       this._ToastrService.success(res.message, '', {
  //         progressBar: true,
  //         positionClass: 'toast-bottom-right',
          
  //       });

  //       console.log(res);
  //     },
  //     error: (e) => {
  //       console.log(e);
  //     },
  //   });
  // }
}
