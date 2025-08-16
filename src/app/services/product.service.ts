import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private products: Product[] = [
    {id: 1, title: 'Laptop', price: 3800},
    {id: 1, title: 'Phone', price: 2900},
    {id: 1, title: 'Headphones', price: 230},
  ];

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

}
