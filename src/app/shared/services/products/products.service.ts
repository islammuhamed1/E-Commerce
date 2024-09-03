import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../../base/enviroment';
import { IProducts } from '../../interfaces/iproducts';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly _HttpClient= inject(HttpClient)
  getAllProducts():Observable<IProducts>{
    return this._HttpClient.get<IProducts>(`${baseUrl}/api/v1/products`)
  }
  getProductById(productId:string):Observable<{data:IProducts}>{
    return this._HttpClient.get<{data:IProducts}>(`${baseUrl}/api/v1/products/${productId}`)
  }
}
