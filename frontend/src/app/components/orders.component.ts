import {Component, OnInit} from '@angular/core';
import {AppService} from "../service/app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-orders',
  template: `
    <mat-card *ngFor="let order of (orders$ | async)">
      <mat-card-content>
        <mat-list>
          <p matSubheader ngClass="status">{{ order.status }}</p>
          <mat-list-item>
            <img matListAvatar src="assets/tesla.png" alt="tesla">
            <h3 matLine> {{ order.name }} </h3>
            <p matLine>
              <span> Total: {{order.amount | currency}} </span>
            </p>
          </mat-list-item>
        </mat-list>
      </mat-card-content>
      <mat-card-actions *ngIf="order.status == 'Waiting for payment'">
        <button mat-raised-button color="primary" (click)="pay(order)">PAY</button>
        <button mat-raised-button (click)="cancel(order)">Cancel</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .status {
      color: red;
    }
  `]
})
export class OrdersComponent implements OnInit {

  orders$;

  constructor(private as: AppService,
              private router: Router) {
    this.orders$ = as.getOrders();
  }

  ngOnInit() {
  }

  pay(order) {
    this.router.navigate(['/app/order', order.id]);
  }

  cancel(order) {
    // cancel order then reload
    this.as.cancelOrder(order).subscribe(
      () => {
        this.orders$ = this.as.getOrders();
      }
    );
  }

}
