package com.example.courseservice.client;

import com.example.courseservice.entity.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;

import java.util.List;

@HttpExchange
public interface UserClient {

    @GetExchange("/user/course/{courseId}")
    public List<User> findByCourse(@PathVariable("courseId") Integer courseId);
}
