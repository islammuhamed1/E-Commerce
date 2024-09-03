import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl, urlServer } from '../../../base/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  myHeader:any = {token : localStorage.getItem('userToken')}
  private readonly _HttpClient =inject(HttpClient)
  checkOut(idCart:string|null , shippingDetails:object):Observable<any>{
    return this._HttpClient.post(`${baseUrl}/api/v1/orders/checkout-session/${idCart}?url=:${urlServer}}`,
      {
        "shippingAddress":shippingDetails
      },
      {
        headers:this.myHeader
      }
    )
  }
  getUserOrders(id:string):Observable<any>{
    return this._HttpClient.get(`${baseUrl}/api/v1/orders/user/${id}`)
  }
}
