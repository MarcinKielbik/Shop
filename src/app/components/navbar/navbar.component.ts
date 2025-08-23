import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
 styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  cartCount$: Observable<number>;
  //cartCount$: Observable<number>;

  constructor(private cartService: CartService) {
    this.cartCount$ = this.cartService.cart$.pipe(
      map(items => items.reduce((sum, item) => sum + item.quantity, 0))
    );

  }


}
