import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppService} from "../service/app.service";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-orders',
  template: `
    <ng-container *ngIf=" (orders$ | async) as orders">
      <ng-container *ngIf="orders.length; else empty_content">
        <mat-card *ngFor="let order of orders">
          <mat-card-content>
            <mat-list>
              <p matSubheader ngClass="status">{{ order.status }}</p>
              <mat-list-item>
                <img matListAvatar src="assets/tesla.png" alt="tesla">
                <h3 matLine> {{ order.name }} </h3>
                <p matLine>
                  <span> Total: {{order.amount | currency}} </span>
                  <span class="list">Time: {{ order.orderTime * 1000 | date:'yyyy-MM-dd HH:mm z':'+0800' }}</span>
                </p>
              </mat-list-item>
            </mat-list>
          </mat-card-content>
          <mat-card-actions *ngIf="order.status == 'Waiting for payment'">
            <button mat-raised-button color="primary" (click)="pay(order)">PAY</button>
            <button mat-raised-button (click)="cancel(order)">Cancel</button>
          </mat-card-actions>
        </mat-card>
      </ng-container>
      <ng-template #empty_content>
        <mat-card>You haven't create any orders, let's buy something</mat-card>
      </ng-template>
    </ng-container>
  `,
  styles: [`
    .status {
      color: red;
    }

    .list {
      display: block;
    }
  `]
})
export class OrdersComponent implements OnInit, OnDestroy {

  orders$;
  navigationSubscription;

  constructor(private as: AppService,
              private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.reload();
      }
    });
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

  reload() {
    this.orders$ = this.as.getOrders();
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

}
