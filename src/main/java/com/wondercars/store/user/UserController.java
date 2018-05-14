package com.wondercars.store.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rest")
public class UserController {

    @Autowired
    private UserRepository userRepo;

    @GetMapping("/users")
    public List listUsers() {
        return userRepo.getUsers();
    }
}
