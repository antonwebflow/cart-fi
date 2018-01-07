import {product} from './../product';
import {cartService} from './cartService';
import {Component} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {CartState} from './CartState';

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.html'
})

export default class shoppingList {
  products: product[];
  total: number;
  private subscription: Subscription;

  constructor(private _cartService: cartService) {
  }

  ngOnInit() {
    this.subscription = this
      ._cartService
      .CartState
      .subscribe((state: CartState) => {
        this.products = state.products;
        this.total = 0;
        this.products.map((item) => {
          this.total += item.price;
        });
      });
  }

  ngOnDestroy() {
    this
      .subscription
      .unsubscribe();

    console.log('onDestroy')

  }
}
