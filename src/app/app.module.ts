import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { HttpModule } from "@angular/http";
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CartComponent } from './cart/cart.component';

import shoppingCart from './cart/shopping-cart';
import shoppingCartItem from './cart/shopping-cart-item';
import shoppingList from './cart/shopping-list';
import {cartService} from './cart/cartService';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    shoppingCart,
    shoppingCartItem,
    shoppingList,
    CartComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: CartComponent },
      { path: 'cart', component: CartComponent }
    ])
  ],
  providers: [
    cartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
