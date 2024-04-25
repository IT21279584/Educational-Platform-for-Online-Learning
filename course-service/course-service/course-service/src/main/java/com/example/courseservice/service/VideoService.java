package com.example.courseservice.service;

import com.example.courseservice.entity.Video;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface VideoService {
    String uploadVideo(Integer courseId, MultipartFile file) throws IOException;
    void saveVideoUrlToDatabase(Integer courseId, String s3Url);

    List<Video> getAllVideosByCourseId(Integer courseId);
}
