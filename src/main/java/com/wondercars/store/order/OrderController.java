package com.wondercars.store.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/rest")
public class OrderController {

    @Autowired
    private OrderRepository orderRepo;

    @GetMapping("/products")
    public List getProducts() {
        return orderRepo.getProducts();
    }

    @GetMapping("/order/{id}")
    public Map getOrderById(@PathVariable String id) {
        return orderRepo.findOrder(Integer.parseInt(id));
    }

    @PostMapping("/order")
    public int createOrder(@RequestBody Map map) {
        Map car = orderRepo.getProduct((int) map.get("id"));
        HashMap order = new HashMap();
        order.put("userId", 1); // assume user id is 1
        order.put("productId", car.get("id"));
        order.put("amount", car.get("price"));
        return orderRepo.createOrder(order);
    }

    @PutMapping("/order")
    public int updateOrder(@RequestBody Map map) {
        HashMap order = new HashMap();
        order.put("id", map.get("id")); // assume user id is 1
        order.put("status", map.get("status"));
        return orderRepo.updateOrder(order);
    }

    @GetMapping("/orders")
    public List listOrders() {
        return orderRepo.getOrders();
    }

    @DeleteMapping("/orders")
    public void clearOrders() {
        orderRepo.clearOrders();
    }
}
