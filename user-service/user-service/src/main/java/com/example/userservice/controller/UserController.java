package com.example.userservice.controller;


import com.example.userservice.entity.Role;
import com.example.userservice.entity.User;
import com.example.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<User> register(@RequestBody User user) {
        try {
            String username = user.getUsername();
            String password = user.getPassword();
            user.setRole(Role.LEARNER);
            String email = user.getEmail();
            String userCode = user.getUserCode();

            String encryptedPassword = passwordEncoder.encode(password);

            User newUser = new User(null, email, username, encryptedPassword, Role.LEARNER, userCode);
            User savedUser = userService.saveUser(newUser);

            return ResponseEntity.ok(savedUser); // Return success response with user data
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null); // Return error response
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Return error response
        }
    }

    @PostMapping("/instructor/register")
    public ResponseEntity<User> instructorRegistration(@RequestBody User user) {
        try {
            String username = user.getUsername();
            String password = user.getPassword();
            user.setRole(Role.INSTRUCTOR);
            String email = user.getEmail();
            String userCode = user.getUserCode();

            String encryptedPassword = passwordEncoder.encode(password);

            User newUser = new User(null, email, username, encryptedPassword, Role.INSTRUCTOR, userCode);
            User savedUser = userService.saveUser(newUser);

            return ResponseEntity.ok(savedUser); // Return success response with user data
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest().body(null); // Return error response
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Return error response
        }
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
