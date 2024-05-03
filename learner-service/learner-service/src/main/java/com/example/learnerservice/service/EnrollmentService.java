package com.example.learnerservice.service;
import com.example.learnerservice.dto.CourseDTO;
import com.example.learnerservice.dto.UserDTO;
import com.example.learnerservice.model.Enrollment;
import com.example.learnerservice.model.EnrollmentId;
import com.example.learnerservice.repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private RestTemplate restTemplate;

    public Enrollment enrollment(EnrollmentId enrollmentId) {
        try {
            // Fetch user details using userId
            UserDTO userDTO = getUserDetails(enrollmentId.getUserId());
            if (userDTO == null) {
                throw new RuntimeException("User not found with ID: " + enrollmentId.getUserId());
            }

            // Fetch course details using courseId
            CourseDTO courseDTO = getCourseDetails(enrollmentId.getCourseId());
            if (courseDTO == null) {
                throw new RuntimeException("Course not found with ID: " + enrollmentId.getCourseId());
            }

            // Create a new Enrollment object
            Enrollment enrollment = new Enrollment();
            enrollment.setUserId(enrollmentId.getUserId());
            enrollment.setCourseId(enrollmentId.getCourseId());

            // Save the enrollment
            return enrollmentRepository.save(enrollment);
        } catch (HttpClientErrorException.Unauthorized e) {
            throw new RuntimeException("Unauthorized access to external service: " + e.getStatusCode());
        }
    }

    private UserDTO getUserDetails(Integer userId) {
        String userUrl = "http://localhost:8082/api/users/" + userId; // Assuming this is your user service endpoint
        return restTemplate.getForObject(userUrl, UserDTO.class);
    }

    private CourseDTO getCourseDetails(Integer courseId) {
        String courseUrl = "http://localhost:8083/api/course/" + courseId; // Assuming this is your course service endpoint
        return restTemplate.getForObject(courseUrl, CourseDTO.class);
    }

    public void unenroll(Integer enrollId) {

        Enrollment enrollment = enrollmentRepository.findById(enrollId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found with ID: " + enrollId));

        enrollmentRepository.delete(enrollment);
    }
}

