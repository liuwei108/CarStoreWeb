import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../service/app.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-order-detail',
  template: `
    <mat-card *ngIf="(order$ | async) as order">
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
        <app-checkout [order]="order" (paid)="reload($event)"></app-checkout>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .status {
      color: red;
    }
  `]
})
export class OrderDetailComponent implements OnInit {

  order$;

  constructor(private route: ActivatedRoute,
              private as: AppService) {
    let orderId = this.route.snapshot.paramMap.get('orderID');
    this.order$ = this.as.getOrder(orderId).pipe(
      tap((order) => {
        if (order['status'] == 'Waiting for payment') {
          this.as.setLoading(true);
        }
      })
    );
  }

  ngOnInit() {
  }

  reload(orderId) {
    this.order$ = this.as.getOrder(orderId);
  }


}
