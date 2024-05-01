package com.example.userservice.service;


import com.example.userservice.entity.User;

import java.util.List;

public interface UserService {
    User saveUser(User user);

    List<User> findByCourse(Integer courseId);
}
