package com.wondercars.store.order;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashMap;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
public class OrderControllerTest {


    @Autowired
    private OrderController orderController;
    @Test
    public void getProducts() {
    }

    @Test
    public void getOrderById() {
    }

    @Test
    public void createOrder() {
        HashMap map = new HashMap();
        map.put("id", 1);
        int id = orderController.createOrder(map);
        assertEquals(1, id);

    }

    @Test
    public void listOrders() {
    }
}