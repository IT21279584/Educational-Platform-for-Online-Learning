package com.example.learnerservice.controller;

import com.example.learnerservice.model.Enrollment;
import com.example.learnerservice.model.EnrollmentId;
import com.example.learnerservice.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    @DeleteMapping("/unenroll/{enrollId}")
    public void unenroll(@PathVariable Integer enrollId) {
        enrollmentService.unenroll(enrollId);
    }

    @GetMapping("/{userId}")
    public List<Enrollment> getEnrolledCoursesByUserId(@PathVariable Integer userId) {
        return enrollmentService.getEnrolledCoursesByUserId(userId);
    }

}
