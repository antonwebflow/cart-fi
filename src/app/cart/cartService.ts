import {product} from './../product';
import {CartState} from './CartState';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import "rxjs/add/operator/map";
import "rxjs/add/operator/share";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/forkJoin";
import "rxjs/add/observable/throw";

@Injectable()
export class cartService {
  private url = 'http://localhost';

  constructor(private http: Http) {
  }

  private cartSubject = new Subject<CartState>();
  CartState = this.cartSubject.asObservable();

  Products: product[] = [];

  addProduct(_product: any) {
    this.Products.push(_product);
    this.cartSubject.next(<CartState>{products: this.Products});
  }

  removeProduct(id: any) {
    this.Products = this.Products.filter((_item) => _item.id !== id);
    this.cartSubject.next(<CartState>{products: this.Products});
  }

  getAllProducts(): Observable<any> {
    return Observable.forkJoin([
      this.http.get(this.url + ':5001/api')
        .map((response: Response) => (response.json())),
      this.http.get(this.url + ':5002/api')
        .map((response: Response) => (response.json())),
      this.http.get(this.url + ':5003/api')
        .map((response: Response) => (response.json())),
    ]).map((data: any[]) => {

      const generateUUID = () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
      }

      const productsPrices = Object.values(data[0]);
      const productsTitles = Object.values(data[1]);
      const productsImages = Object.values(data[2]);

      let products = [];
      let product = {};

      for (let title of productsTitles) {
        product = {
          id: generateUUID(),
          title: title
        }
        products.push(product);
      }

      productsPrices.forEach(function (price, index) {
        products[index].price = price;
      });

      productsImages.forEach(function (image, index) {
        products[index].image = image;
      });

      return products;

    }).catch((error: Response) => Observable.throw(error.json()));
  }

}
