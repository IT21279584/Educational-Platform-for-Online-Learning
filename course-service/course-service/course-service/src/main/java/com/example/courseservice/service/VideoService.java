
package com.example.courseservice.service;

import com.example.courseservice.entity.Video;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface VideoService {
    String uploadVideo(Integer courseId, MultipartFile file, String description) throws IOException;
    void saveVideoUrlToDatabase(Integer courseId, String s3Url, String description);

    List<Video> getAllVideosByCourseId(Integer courseId);

    List<Video> getAllVideos();

    Optional<Video> getVideo(Integer videoId);
}
