package com.example.userservice.controller;


import com.example.userservice.entity.Role;
import com.example.userservice.entity.User;
import com.example.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

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
        user.setRole(Role.LEARNER);
        Role role = user.getRole();
        Integer id = user.getUserId();
        String email = user.getEmail();
        String userCode = user.getUserCode();

        String encryptedPassword = passwordEncoder.encode(password);

        User newUser = new User(id, email, username,  encryptedPassword, role, userCode);

        return userService.saveUser(newUser);
    }
    @PostMapping("/instructor/register")
    public User instructorRegistration(@RequestBody User user){
        String username  = user.getUsername();
        String password = user.getPassword();
        user.setRole(Role.INSTRUCTOR);

        Role role = user.getRole();
        Integer id = user.getUserId();
        String email = user.getEmail();
        String userCode = user.getUserCode();

        String encryptedPassword = passwordEncoder.encode(password);
        User newUser = new User(id, email, username,  encryptedPassword, role, userCode);

        return userService.saveUser(newUser);
    }


    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Integer userId) {
        User user = userService.getUserById(userId);
        if (user != null) {

            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
