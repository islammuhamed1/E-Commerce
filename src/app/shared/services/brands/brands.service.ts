import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBrands } from '../../interfaces/ibrands';
import { baseUrl } from '../../../base/enviroment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private readonly _HttpClient = inject(HttpClient);

  getAlBrands(): Observable<IBrands> {
    return this._HttpClient.get<IBrands>(`${baseUrl}/api/v1/brands`);
  }

  getSpecificBrand(id: string | null): Observable<any> {
    return this._HttpClient.get(`${baseUrl}/api/v1/brands/${id}`);
  }
}
