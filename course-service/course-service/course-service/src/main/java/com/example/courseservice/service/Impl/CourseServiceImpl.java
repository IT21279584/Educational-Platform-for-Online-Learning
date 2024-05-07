package com.example.courseservice.service.Impl;

import com.example.courseservice.dto.UserDTO;
import com.example.courseservice.entity.Course;
import com.example.courseservice.repository.CourseRepository;
import com.example.courseservice.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private RestTemplate restTemplate;


    @Override
    public Course addCourse(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public Optional<Course> getCourse(Integer courseId) {
        return courseRepository.findById(courseId);
    }

    @Override
    public List<Course> getCourses() {
        return courseRepository.findAll();
    }

    @Override
    public void deleteCourse(Integer courseId) {
        courseRepository.deleteById(courseId);
    }

    @Override
    public Course createCourse(Course course) {
        // Fetch user details using userId
        UserDTO userDTO = getUserDetails(course.getUserId());
        if (userDTO == null) {
            throw new RuntimeException("User not found with ID: " + course.getUserId());
        }

        // Set the user ID in the course entity
        course.setUserId(userDTO.getUserId());

        // Save the course
        return courseRepository.save(course);
    }

    @Override
    public List<Course> getVideosByUserId(Integer userId) {
        return courseRepository.findByUserId(userId);
    }

    private UserDTO getUserDetails(Integer userId) {
        String userUrl = "http://localhost:8082/api/users/" + userId; // Assuming this is your user service endpoint
        return restTemplate.getForObject(userUrl, UserDTO.class);
    }
}
