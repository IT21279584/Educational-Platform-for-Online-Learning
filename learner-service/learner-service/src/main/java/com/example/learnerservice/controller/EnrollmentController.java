package com.example.learnerservice.controller;

import com.example.learnerservice.model.Enrollment;
import com.example.learnerservice.model.EnrollmentId;
import com.example.learnerservice.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/enroll")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    // EnrollmentController
    @PostMapping("/enroll")
    public Enrollment enrollment(@RequestBody EnrollmentId enrollmentId) {
        return enrollmentService.enrollment(enrollmentId);
    }

}
