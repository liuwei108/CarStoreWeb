package com.wondercars.store;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
@Controller
public class StoreApplication {

    @GetMapping(value = "/app/**/{[path:[^\\.]*}")
    public String redirect() {
        return "forward:/";
    }

    public static void main(String[] args) {
        SpringApplication.run(StoreApplication.class, args);
    }
}
