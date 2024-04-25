package com.example.courseservice.service.Impl;

import com.example.courseservice.entity.Course;
import com.example.courseservice.entity.Note;
import com.example.courseservice.repository.NoteRepository;
import com.example.courseservice.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import java.io.IOException;
import java.util.UUID;

@Service
public class NoteServiceImpl implements NoteService {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private AmazonS3 amazonS3;

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    @Override
    public String uploadLectureNote(Integer courseId, String title, MultipartFile file) throws IOException {
        try {
            // Generate a unique key for the lecture note file
            String key = "lecture_notes/" + UUID.randomUUID().toString() + "/" + file.getOriginalFilename();

            // Upload lecture note to Amazon S3
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType("application/pdf"); // Adjust content type as needed
            amazonS3.putObject(bucketName, key, file.getInputStream(), metadata);

            // Construct Amazon S3 URL
            String s3Url = amazonS3.getUrl(bucketName, key).toString();

            // Save Amazon S3 URL and title to database
            saveLectureNoteToDatabase(courseId, title, s3Url);

            return s3Url;

        } catch (Exception e) {
            throw e;
        }
    }

    public void saveLectureNoteToDatabase(Integer courseId, String title, String s3Url) {
        // Set course
        Course course = new Course();
        course.setCourseId(courseId);

        // Save Amazon S3 URL and title to database
        Note note = new Note();
        note.setNoteUrl(s3Url);
        note.setTitle(title);
        note.setCourse(course);
        noteRepository.save(note);
    }
}
