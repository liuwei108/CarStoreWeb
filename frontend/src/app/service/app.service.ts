import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class AppService {

  loading$: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.loading$ = new BehaviorSubject<boolean>(false);
  }

  getLoading() {
    return this.loading$;
  }

  setLoading(pending: boolean) {
    this.loading$.next(pending);
  }

  getCars() {
    return this.http.get('/rest/products');
  }

  getOrders() {
    return this.http.get('/rest/orders');
  }

  getOrder(id) {
    return this.http.get('/rest/order/' + id);
  }

  createOrder(car): Observable<number> {
    return this.http.post<number>('/rest/order', car);
  }

  cancelOrder(order) {
    order.status = 'Canceled';
    return this.http.put('/rest/order', order);
  }

}
