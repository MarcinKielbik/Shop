import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
products: Product[] = [];

  constructor(private cartService: CartService, 
    private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  addToCart(product: Product) {
  this.cartService.addToCart({
    productId: product.id,
    quantity: 1,
    title: product.title,
    price: product.price
  });
}

}
