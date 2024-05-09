package com.example.userservice.service.Impl;

import com.example.userservice.entity.User;
import com.example.userservice.repository.UserRepository;
import com.example.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User saveUser(User user) throws Exception {
        // Check if the email is already in use
        try{
            User existingUserWithEmail = userRepository.findByEmail(user.getEmail());
            if (existingUserWithEmail != null) {
                // Handle duplicate email
                throw new Exception("Email is already in use");
            }

            // Check if the username is already in use
            User existingUserWithUsername = userRepository.findByUsername(user.getUsername());
            if (existingUserWithUsername != null) {
                // Handle duplicate username
                throw new Exception("Username is already in use");
            }
            // Save the user if email and username are not already in use
            return userRepository.save(user);
        }catch(Exception e){
            e.printStackTrace();
            throw e;
        }
    }


    @Override
    public User getUserById(Integer userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
    }
}
