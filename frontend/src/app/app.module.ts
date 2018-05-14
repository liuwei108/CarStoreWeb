import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppMaterialModule} from "./app-material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {AppService} from './service/app.service';
import {FlexLayoutModule} from "@angular/flex-layout";
import {CarsComponent} from './components/cars.component';
import {OrdersComponent} from './components/orders.component';
import {OrderDetailComponent} from './components/order-detail.component';
import {CheckoutComponent} from './components/checkout.component';
import {LoadingModule} from "ngx-loading";

const routes: Routes = [
  {path: '', redirectTo: 'app/home', pathMatch: 'full'},
  {
    path: 'app/home',
    component: CarsComponent,
  },
  {
    path: 'app/orders',
    component: OrdersComponent,
  },
  {
    path: 'app/order/:orderID',
    component: OrderDetailComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    OrdersComponent,
    OrderDetailComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LoadingModule,
    FlexLayoutModule,
    HttpClientModule,
    AppMaterialModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
