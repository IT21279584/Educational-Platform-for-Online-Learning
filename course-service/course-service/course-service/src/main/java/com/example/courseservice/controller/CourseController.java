package com.example.courseservice.controller;

import com.example.courseservice.entity.Course;
import com.example.courseservice.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/course")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @PostMapping
    public Course addCourse(@RequestBody Course course){
        return courseService.addCourse(course);
    }

    @PostMapping("/add")
    public ResponseEntity<Course> createCourse(@RequestBody Course courseRequest) {
        try {
            Course savedCourse = courseService.createCourse(courseRequest);
            return ResponseEntity.ok(savedCourse);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred while creating the course", e);
        }
    }

    @GetMapping("/{courseId}")
    public Optional<Course> getCourse(@PathVariable Integer courseId){
        return courseService.getCourse(courseId);
    }

    @GetMapping("/course/{userId}")
    public List<Course> getVideosByUserId(@PathVariable Integer userId){
        return courseService.getVideosByUserId(userId);
    }
}
