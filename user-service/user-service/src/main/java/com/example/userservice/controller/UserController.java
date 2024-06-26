package com.example.userservice.controller;


import com.example.userservice.entity.Role;
import com.example.userservice.entity.User;
import com.example.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public User register(@RequestBody User user){
        String username  = user.getUsername();
        String password = user.getPassword();
        Role role = user.getRole();
        String id = user.get_id();
        String email = user.getEmail();
        String userCode = user.getUserCode();

        String encryptedPassword = passwordEncoder.encode(password);

        User newUser = new User(id, email, username,  encryptedPassword, role, userCode);

        return userService.saveUser(newUser);
    }
}
