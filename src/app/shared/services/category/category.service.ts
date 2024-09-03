import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../../base/enviroment';
import { ICategory } from '../../interfaces/icategory';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly _HttpClient = inject(HttpClient);
  getAllCategories():Observable<ICategory> {
    return this._HttpClient.get<ICategory>(`${baseUrl}/api/v1/categories`);
  }
}
