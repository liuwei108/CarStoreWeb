package com.wondercars.store.braintree;

import com.braintreegateway.BraintreeGateway;
import com.braintreegateway.Result;
import com.braintreegateway.Transaction;
import com.braintreegateway.TransactionRequest;
import com.wondercars.store.order.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import static com.wondercars.store.braintree.Constants.accessToken;

@Service
public class BrainTreeService {

    @Autowired
    private OrderRepository orderRepo;

    private BraintreeGateway gateway;

    public BrainTreeService() {
        // Construct gateway object on application start
        this.gateway = new BraintreeGateway(accessToken);
    }

    /**
     * Generate a client token
     */
    public String generateClientToken() {
        return gateway.clientToken().generate();
    }

    /**
     * create a transaction using paymentMethodNonce submitted from client
     */
    public Map createTransaction(Map<String, ?> payload) {
        //get the submitted nonce and amount
        BigDecimal decimalAmount = new BigDecimal(payload.get("amount").toString());
        String nonce = (String) payload.get("paymentMethodNonce");
        int orderId = (Integer) payload.get("orderId");
        //get order detail from db by orderId
        Map orderMap = orderRepo.findOrder(orderId);
        BigDecimal amountInOrder = new BigDecimal(orderMap.get("amount").toString());
        if (amountInOrder.compareTo(decimalAmount) != 0) {
            throw new Error("amount value from client is not equal with amount value in order");
        }
        TransactionRequest request = new TransactionRequest()
                .amount(amountInOrder)
                // PayPal Blocking Duplicate Order IDs... unique orderId needed
                .orderId(orderMap.get("orderNum").toString())
                .paymentMethodNonce(nonce)
                .customer()
                    .firstName("Drew")
                    .lastName("Smith")
                    .company("Braintree")
                    .phone("312-555-1234")
                    .fax("312-555-1235")
                    .website("http://www.example.com")
                    .email("drew@example.com")
                    .done()
                .shippingAddress()
                    .firstName("Jen")
                    .lastName("Smith")
                    .company("Braintree")
                    .streetAddress("1 E 1st St")
                    .extendedAddress("Suite 403")
                    .locality("Bartlett")
                    .region("IL")
                    .postalCode("60103")
                    .countryCodeAlpha2("US")
                    .done()
                .options()
                .submitForSettlement(true)
                .done();

        Result<Transaction> saleResult = gateway.transaction().sale(request);

        if (saleResult.isSuccess()) {
            Transaction transaction = saleResult.getTarget();
            System.out.println("Success! Transaction ID: " + transaction.getId());
            // here we need to update order status
            Map map = new HashMap();
            map.put("id", orderId);
            map.put("status", "Paid");
            orderRepo.updateOrder(map);

            map.put("transactionId", transaction.getId());
            map.put("amount", transaction.getAmount());
            return map;
        } else {
            System.out.println("Failure Message: " + saleResult.getMessage());
            return null;
        }
    }

    /**
     * get transaction details by transaction id
     */
    public Transaction getTransaction(String xaId) {
        Transaction transaction = null;
        try {
            transaction = gateway.transaction().find(xaId);
        } catch (Exception e) {
            System.out.println("Exception: " + e);
        }

        return transaction;

    }
}
