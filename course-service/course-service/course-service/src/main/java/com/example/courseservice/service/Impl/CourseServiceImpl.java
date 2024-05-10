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
        course.setIsApproved(0);

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
    @Override
    public Course updateCourse(Integer courseId, Course updatedCourse) {
        Course existingCourse = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + courseId));

        // Update the existing course with the new data
        existingCourse.setTitle(updatedCourse.getTitle());
        existingCourse.setDescription(updatedCourse.getDescription());
        existingCourse.setCategory(updatedCourse.getCategory());
        existingCourse.setCourseCode(updatedCourse.getCourseCode());
        existingCourse.setCourseType(updatedCourse.getCourseType());
        existingCourse.setDuration(updatedCourse.getDuration());
        existingCourse.setPrice(updatedCourse.getPrice());

        // Save and return the updated course
        return courseRepository.save(existingCourse);
    }

    @Override
    public Course approveCourse(Integer courseId, Course updatedCourse) {
        Course existingCourse = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + courseId));
        existingCourse.setTitle(updatedCourse.getTitle());
        existingCourse.setDescription(updatedCourse.getDescription());
        existingCourse.setCategory(updatedCourse.getCategory());
        existingCourse.setCourseCode(updatedCourse.getCourseCode());
        existingCourse.setCourseType(updatedCourse.getCourseType());
        existingCourse.setDuration(updatedCourse.getDuration());
        existingCourse.setPrice(updatedCourse.getPrice());
        // Update the existing course with the new data

        if(existingCourse.getIsApproved() == 1){
            existingCourse.setIsApproved(0);
        }else{
            existingCourse.setIsApproved(1);
        }

        return courseRepository.save(existingCourse); // Save the existing course, not updatedCourse
    }

}
