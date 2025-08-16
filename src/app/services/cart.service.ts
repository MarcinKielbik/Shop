import { Injectable } from '@angular/core';
import { CartItem } from '../interfaces/cart-item';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private storageKey = 'cart';
  private cartSubject = new BehaviorSubject<CartItem[]>(this.loadFromStorage());


  cart$ = this.cartSubject = new BehaviorSubject<CartItem[]>(this.loadFromStorage());

  constructor() { }

  private loadFromStorage(): CartItem[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveToStorage(cart: CartItem[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }

  addToCart(item: CartItem) {
    const cart = [...this.cartSubject.value];
    const existing = cart.find(p => p.productId === item.productId);

    if (existing) {
      existing.quantity += item.quantity;
    } else {
      cart.push(item);
    }

    this.cartSubject.next(cart);
    this.saveToStorage(cart);
  }

  removeFromCart(productId: number) {
    const cart = this.cartSubject.value.filter(p => p.productId !== productId);
    this.cartSubject.next(cart);
    this.saveToStorage(cart);
  }

  clearCart() {
    this.cartSubject.next([]);
    localStorage.removeItem(this.storageKey);
  }

}
