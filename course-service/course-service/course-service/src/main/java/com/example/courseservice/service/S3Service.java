package com.example.courseservice.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@Service
public class S3Service {

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    private final AmazonS3 s3Client;

    public S3Service(@Value("${aws.region}") String region) {
        this.s3Client = AmazonS3ClientBuilder.standard()
                .withRegion(region)
                .build();
    }

    public void uploadVideo(String key, MultipartFile file) throws IOException {
        s3Client.putObject(new PutObjectRequest(bucketName, key, file.getInputStream(), null));
    }
}
