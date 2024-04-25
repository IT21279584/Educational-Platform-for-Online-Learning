package com.example.courseservice.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface NoteService {
    String uploadLectureNote(Integer courseId, String title, MultipartFile file) throws IOException;
    void saveLectureNoteToDatabase(Integer courseId, String title, String s3Url);
}
