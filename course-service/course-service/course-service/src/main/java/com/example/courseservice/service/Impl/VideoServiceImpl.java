package com.example.courseservice.service.Impl;

import com.example.courseservice.entity.Course;
import com.example.courseservice.entity.Video;
import com.example.courseservice.repository.VideoRepository;
import com.example.courseservice.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class VideoServiceImpl implements VideoService {

    @Autowired
    private VideoRepository videoRepository;

    @Autowired
    private AmazonS3 amazonS3;

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    @Override
    public String uploadVideo(Integer courseId, MultipartFile file) throws IOException {
        try{
            // Generate a unique key for the video file
            String key = "videos/" + UUID.randomUUID().toString() + "/" + file.getOriginalFilename();

            // Upload video to Amazon S3
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType("video/mp4");
            amazonS3.putObject(bucketName, key, file.getInputStream(), metadata);

            // Construct Amazon S3 URL
            String s3Url = amazonS3.getUrl(bucketName, key).toString();

            // Save Amazon S3 URL to database
            saveVideoUrlToDatabase(courseId,s3Url);

            return s3Url;

        }catch (Exception e){
            throw e;
        }
    }

    @Override
    public void saveVideoUrlToDatabase(Integer courseId, String s3Url) {
        //set course
        Course course = new Course();
        course.setCourseId(courseId);
        // Save Amazon S3 URL to database
        Video video = new Video();
        video.setS3Url(s3Url);
        video.setCourse(course);
        videoRepository.save(video);
    }

    @Override
    public List<Video> getAllVideosByCourseId(Integer courseId) {
        return videoRepository.findByCourseCourseId(courseId);
    }
}
