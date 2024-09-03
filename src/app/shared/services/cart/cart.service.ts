import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { baseUrl } from "../../../base/enviroment";
import { ICart } from "../../interfaces/icart";

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly _HttpClient = inject(HttpClient);
  userTokenHeader = {
    token: localStorage.getItem('userToken') || '',
  };

  addProductToCart(productId: string): Observable<any> {
    return this._HttpClient.post(
      `${baseUrl}/api/v1/cart`,
      { productId: productId },
      {
        headers: this.userTokenHeader,
      }
    );
  }

  getLoggedUserCart(): Observable<ICart> {
    return this._HttpClient.get<ICart>(`${baseUrl}/api/v1/cart`, {
      headers: this.userTokenHeader,
    });
  }

  updateProductCart(productId: string, count: string): Observable<ICart> {
    return this._HttpClient.put<ICart>(
      `${baseUrl}/api/v1/cart/${productId}`,
      { count: count },
      {
        headers: this.userTokenHeader,
      }
    );
  }

  removeProductFromCart(productId: string): Observable<ICart> {
    return this._HttpClient.delete<ICart>(
      `${baseUrl}/api/v1/cart/${productId}`,
      {
        headers: this.userTokenHeader,
      }
    );
  }
}
