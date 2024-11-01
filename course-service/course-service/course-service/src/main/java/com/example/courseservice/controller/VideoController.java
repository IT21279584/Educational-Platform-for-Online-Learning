package com.example.courseservice.controller;

import com.example.courseservice.entity.Video;
import com.example.courseservice.service.Impl.VideoServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/videos")
public class VideoController {

    @Autowired
    private VideoServiceImpl videoService;

    @PostMapping("/upload/{courseId}")
    public ResponseEntity<String> uploadVideo(@PathVariable Integer courseId, @RequestParam("file") MultipartFile file, @RequestParam("description") String description) {
        try {
            // Upload video to Amazon S3 and get the URL
            String s3Url = videoService.uploadVideo(courseId, file,description);

            // Return Amazon S3 URL to frontend
            return ResponseEntity.ok(s3Url);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload video.");
        }
    }

    @GetMapping("/{courseId}")
    public List<Video> getAllVideosByCourseId(@PathVariable Integer courseId){
        return videoService.getAllVideosByCourseId(courseId);
    }

    @GetMapping("/all")
    public List<Video> getAllVideos(){
        return videoService.getAllVideos();
    }

    @GetMapping("/video/{videoId}")
    public Optional<Video> getVideo(@PathVariable Integer videoId){
        return videoService.getVideo(videoId);
    }
}
