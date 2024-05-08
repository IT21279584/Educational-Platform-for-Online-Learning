package com.example.userservice.controller;


import com.example.userservice.entity.AuthenticationRequest;
import com.example.userservice.entity.User;
import com.example.userservice.entity.UserAuthenticationDetails;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

import static com.example.userservice.constants.Constant.SECRET_KEY;

@RestController
@RequestMapping("/api/users")
public class AuthenticationController {
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;

    public AuthenticationController(AuthenticationManager authenticationManager, UserDetailsService userDetailsService) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest authenticationRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
                            authenticationRequest.getPassword()));

            UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

            if (userDetails == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User details not found");
            }

            // Get user roles
            Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();
            List<String> role = new ArrayList<>();
            for (GrantedAuthority authority : authorities) {
                role.add(authority.getAuthority());
            }
            Integer userId = getUserIdFromUserDetails(userDetails);
            // Build claims
            Map<String, Object> claims = new HashMap<>();
            claims.put("sub", userDetails.getUsername());
            claims.put("iat", new Date().getTime());
            claims.put("userId", userId); // Add userId as a claim
            claims.put("role", role); // Add roles as a claim

            // Generate JWT token
            String token = Jwts.builder()
                    .setClaims(claims)
                    .setExpiration(new Date(System.currentTimeMillis() + 864000000)) // Token validity: 10 days
                    .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                    .compact();
            Map<String, String> response = new HashMap<>();
            response.put("token", token);

            System.out.println("Generated Token: " + token);
            System.out.println("SecretKey : " + SECRET_KEY);

            return ResponseEntity.ok(response);

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect username or password");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
        }
    }
    // Method to retrieve userId from UserDetails
    // Method to retrieve userId from UserDetails
    private Integer getUserIdFromUserDetails(UserDetails userDetails) {
        if (userDetails instanceof UserAuthenticationDetails) {
            UserAuthenticationDetails userAuthDetails = (UserAuthenticationDetails) userDetails;
            User user = userAuthDetails.getUser();
            return user.getUserId(); // Assuming you have a getId() method in your User class
        }
        return null;
    }


}