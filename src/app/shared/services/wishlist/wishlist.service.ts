import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../../base/enviroment';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly _HttpClient = inject(HttpClient);
  userTokenHeader = {
    token: localStorage.getItem('userToken') || '',
  };
  addProductToWishList(id: string): Observable<any> {
    return this._HttpClient.post(
      `${baseUrl}/api/v1/wishlist`,
      {
        productId: id,
      },
      {
        headers: this.userTokenHeader,
      }
    );
  }
  getLoggedWishList(): Observable<any> {
    return this._HttpClient.get(`${baseUrl}/api/v1/wishlist`, {
      headers: this.userTokenHeader,
    });
  }
  removeProductFromWishList(id:string): Observable<any> {
    return this._HttpClient.delete(`${baseUrl}/api/v1/wishlist/${id}`, {
      headers: this.userTokenHeader,
    });
  }

}
