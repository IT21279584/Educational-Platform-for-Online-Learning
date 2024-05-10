package com.example.courseservice.service;

import com.example.courseservice.entity.Course;

import java.util.List;
import java.util.Optional;

public interface CourseService {
    Course addCourse(Course course);
    Optional<Course> getCourse(Integer courseId);
    List<Course> getCourses();
    void deleteCourse(Integer courseId);
    Course createCourse(Course course);
    List<Course> getVideosByUserId(Integer userId);
    Course updateCourse(Integer courseId, Course updatedCourse);
    Course approveCourse(Integer courseId, Course updatedCourse);
}
