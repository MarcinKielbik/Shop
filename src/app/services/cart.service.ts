import { Injectable } from '@angular/core';
import { CartItem } from '../interfaces/cart-item';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storageKey = 'cart';
  private cartSubject = new BehaviorSubject<CartItem[]>(this.loadFromStorage());
  cart$ = this.cartSubject.asObservable();

  constructor() {}

  private loadFromStorage(): CartItem[] {
    if (typeof window === 'undefined' || !window.localStorage) {
      return []; // SSR lub brak localStorage
    }
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveToStorage(cart: CartItem[]) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.storageKey, JSON.stringify(cart));
    }
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
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(this.storageKey);
    }
  }
}
