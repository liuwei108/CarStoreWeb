import {Component} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {AppService} from "./service/app.service";

@Component({
  selector: 'app-root',
  template: `
    <header>
      <nav>
        <mat-toolbar color="primary" fxLayoutAlign="space-between center">
          <div fxFlex="20">Car Store</div>
          <div fxFlex>
            <span><a mat-button routerLink="/app/home"> Cars </a></span>
            <span><a mat-button routerLink="/app/orders"> My Orders </a></span>
          </div>
          <div fxFlex="20" fxLayoutAlign="end center">
            <a mat-button routerLink="/app/login">
              <mat-icon>person</mat-icon>
              David
            </a>
            <button mat-icon-button>
              <mat-icon>settings</mat-icon>
            </button>
          </div>
        </mat-toolbar>
      </nav>
    </header>
    <div>
      <ngx-loading [show]="(loading$ | async)"></ngx-loading>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {
  loading$: Observable<boolean>;

  constructor(private as: AppService) {
    this.loading$ = this.as.getLoading();
  }
}
