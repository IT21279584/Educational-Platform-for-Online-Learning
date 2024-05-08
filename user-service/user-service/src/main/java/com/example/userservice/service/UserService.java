package com.example.userservice.service;


import com.example.userservice.entity.User;

import java.util.Optional;

public interface UserService {
    User saveUser(User user);
    User getUserById(Integer userId);

}
