import { Pipe, PipeTransform } from '@angular/core';
import { IProductDetails } from '../interfaces/iproducts';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(productList: IProductDetails[] | null | undefined, searching: string): IProductDetails[] {
    if (!productList) {
      return [];
    }
    
    return productList.filter((char) => 
      char.title.toLowerCase().includes(searching.toLowerCase())
    );
  }
  
}
