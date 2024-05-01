package com.example.courseservice.controller;

import com.example.courseservice.client.UserClient;
import com.example.courseservice.entity.Course;
import com.example.courseservice.repository.CourseRepository;
import com.example.courseservice.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/course")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @Autowired
    private UserClient userClient;

    @Autowired
    private CourseRepository courseRepository;

    @GetMapping("/with-users")
    public List<Course> findAllWithUsers(){

        List<Course> courses = courseRepository.findAll();

        courses.forEach(course -> course.setUsers(userClient.findByCourse(course.getCourseId())));

        return courses;
    }

    @PostMapping
    public Course addCourse(@RequestBody Course course){
        return courseService.addCourse(course);
    }
}
