# CarStoreWeb
Demo web project for illustrating Paypal Express Checkout through Braintree SDK.

[Live Demo](http://13.57.3.69/)

Sandbox test account
> buyer_1@paypalsandbox.com / 12345678

## Android integration demo
[CarStoreApp](https://github.com/liuwei108/CarStoreApp)

## Run this webapp on the local machine
1. make sure Java 8 installed
2. download [carstore.jar](https://github.com/liuwei108/CarStoreWeb/raw/master/carstore.jar)
3. run `java -jar carstore.jar --server.port=8080`
4. access http://localhost:8080
> if port 8080 is used, change to other port number in *server.port*

## Technology

This demo uses:

### Frontend
* Javascript (Typescript)
* Angular 5.2.0
* Angular Material 5.1.0
* PayPal [checkout.js](https://github.com/paypal/paypal-checkout) library
* [braintree-web](https://github.com/braintree/braintree-web) JavaScript SDK 3.25.0

### Backend
* Java 8
* Spring Boot 2.0.0
* H2 database
* [Braintree Java library](https://github.com/braintree/braintree_java) 2.80.0

## source code diagram

![diagram](https://raw.githubusercontent.com/liuwei108/CarStoreWeb/master/Diagram.png)
