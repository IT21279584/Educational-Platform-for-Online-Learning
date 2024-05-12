package com.example.paymentbackend;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class PaymentController {

    @Value("${stripe.secret-key}")
    private String stripeSecretKey;

    @PostMapping("/charge")
    public ResponseEntity<String> charge(@RequestBody Map<String, Object> requestData) {
        Stripe.apiKey = stripeSecretKey;

        String tokenId = (String) requestData.get("tokenId");
        Integer amount = (Integer) requestData.get("amount");

        Map<String, Object> params = new HashMap<>();
        params.put("amount", amount); // amount in cents
        params.put("currency", "usd");
        params.put("description", "Example charge");
        params.put("source", tokenId);

        try {
            Charge charge = Charge.create(params);
            return ResponseEntity.ok("Payment successful");
        } catch (StripeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment failed");
        }
    }
}

