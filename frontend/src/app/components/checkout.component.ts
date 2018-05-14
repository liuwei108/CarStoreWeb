import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppService} from "../service/app.service";

@Component({
  selector: 'app-checkout',
  template: `
    <div id="paypal-button-container"></div>
  `,
  styles: []
})
export class CheckoutComponent implements OnInit {

  @Input()
  order;

  @Output()
  paid = new EventEmitter<number>();

  constructor(private as: AppService) {
  }

  ngOnInit() {
    // Render the PayPal button
    let amount = this.order.amount;
    let orderId = this.order.id;
    let as = this.as;
    let paid = this.paid;

    paypal.Button.render({

      // Pass in the Braintree SDK

      braintree: braintree,

      // Pass in your Braintree authorization key

      client: {
        // a new client token should be generated for each request that's sent to Braintree.
        sandbox: paypal.request.get('/rest/paypal/client_token', {headers: {accept: 'text/plain'}}).then(function (result) {
          //show loading overlay before getting click_token from server to avoid clicking paypal button before ready
          as.setLoading(false);
          return result;
        }),
        production: 'xxxxxxxxxxxxxxxxxx'
      },
      style: {
        label: 'paypal',
        size: 'medium',    // small | medium | large | responsive
        shape: 'rect',     // pill | rect
        color: 'black',     // gold | blue | silver | black
        tagline: false
      },
      // Set your environment

      env: 'sandbox', // sandbox | production

      commit: true, // This will add the transaction amount to the PayPal button

      // Wait for the PayPal button to be clicked
      payment: function (data, actions) {

        // Make a call to create the payment

        return actions.braintree.create({
          flow: 'checkout', // Required
          amount: amount, // Required
          currency: 'USD', // Required
          enableShippingAddress: true,
          shippingAddressEditable: true,
          /*shippingAddressOverride: {
            recipientName: 'Scruff McGruff',
            line1: '1234 Main St.',
            line2: 'Unit 1',
            city: 'Chicago',
            countryCode: 'US',
            postalCode: '60652',
            state: 'IL',
            phone: '123.456.7890'
          }*/
        });
      },

      onAuthorize: function (data, actions) {

        console.log('Braintree nonce:', data.nonce);
        // waiting for creating transaction is a bit slow, add loading spinner  here for better experience in client UI
        as.setLoading(true);
        // Submit `payload.nonce` to your server.
        // usage refer https://github.com/paypal/paypal-checkout/blob/master/src/lib/http.js
        paypal.request({
          url: '/rest/paypal/checkout',
          method: 'post',
          json: {
            'paymentMethodNonce': data.nonce,
            'amount': amount,
            'orderId': orderId
          }
        }).then(function (res) {
          console.log('payment success!');
          as.setLoading(false);
          //refresh this page to update order status
          paid.emit(orderId);
        }, function (err) {
          as.setLoading(false);
          console.log(err);
        });
      }

    }, '#paypal-button-container');
  }

}
