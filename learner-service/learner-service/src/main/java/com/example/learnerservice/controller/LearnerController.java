// LearnerController.java
package com.example.learnerservice.controller;

import com.example.learnerservice.service.LearnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/learner")
public class LearnerController {

    private final LearnerService learnerService;

    @Autowired
    public LearnerController(LearnerService learnerService) {
        this.learnerService = learnerService;
    }

    @PostMapping("/enroll")
    public void enrollUser(@RequestParam Long userId, @RequestParam String courseCode) {
        learnerService.enrollUser(userId, courseCode);
    }
}
