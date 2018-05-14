package com.wondercars.store.braintree;

import com.braintreegateway.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/rest/paypal")
public class BrainTreeController {

    @Autowired
    private BrainTreeService brainTreeService;

    /**
     * Generating a client token, which contains all the authorization
     * and configuration information your client needs to initialize
     * the client SDK to communicate with Braintree.
     *
     * @return
     */
    @GetMapping(value = "/client_token", produces = "text/plain")
    public String ClientToken() {
        return brainTreeService.generateClientToken();
    }

    /**
     * create transaction
     *
     * @param payload
     * @return
     */
    @PostMapping("/checkout")
    public Map checkout(@RequestBody Map<String, ?> payload) {
        return brainTreeService.createTransaction(payload);
    }

    /**
     * Search transaction from transactionId
     *
     * @param transactionId
     * @return
     */
    @GetMapping("/checkout/{transactionId}")
    public Transaction getTransaction(@PathVariable String transactionId) {
        return brainTreeService.getTransaction(transactionId);
    }
}
