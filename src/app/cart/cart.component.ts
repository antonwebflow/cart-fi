import {Component, OnInit} from '@angular/core';
import {product} from '../product';
import "rxjs/add/operator/map";
import "rxjs/add/operator/share";
import "rxjs/add/observable/forkJoin";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor() { }

  cart: product[];

  ngOnInit() {

  }

}
