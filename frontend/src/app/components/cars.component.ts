import {Component, OnInit} from '@angular/core';
import {AppService} from "../service/app.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-cars',
  template: `
    <section class="car-grid">
      <mat-grid-list cols="1" rowHeight="1200:627">
        <mat-grid-tile *ngFor="let car of (cars$ | async)">
          <img src="assets/{{car.name}}.png" alt="{{car.name}}">
          <mat-grid-tile-footer>
            <h3 mat-line>{{car.name}}</h3>
            <h3 mat-line>{{car.price | currency}}</h3>
            <span mat-line>{{car.description}}</span>
            <button mat-button (click)="buy(car)">Buy Now</button>
          </mat-grid-tile-footer>
        </mat-grid-tile>
      </mat-grid-list>
    </section>
  `,
  styles: [`
    img {
      width: auto;
      max-height: 100%;
    }
    .mat-grid-tile-footer {
      height: 72px !important;
    }
    .car-grid {
      display: flex;
      justify-content: center;
    }

    mat-grid-list {
      flex: 1 1 auto;
      max-width: 1200px;
    }
  `]
})
export class CarsComponent implements OnInit {

  cars$: Observable<any>;

  constructor(private as: AppService,
              private router: Router) {
    this.cars$ = as.getCars();
  }

  ngOnInit() {
  }

  buy(car) {
    //create order and then go to order detail page.
    this.as.createOrder(car).subscribe(
      (orderId) => {
        this.router.navigate(['/app/order', orderId]);
      }
    );
  }

}
