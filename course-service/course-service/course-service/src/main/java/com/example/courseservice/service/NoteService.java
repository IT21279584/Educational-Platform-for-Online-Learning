package com.example.courseservice.service;

import com.example.courseservice.entity.Note;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface NoteService {
    String uploadLectureNote(Integer courseId, String title, MultipartFile file) throws IOException;
    void saveLectureNoteToDatabase(Integer courseId, String title, String s3Url);

    List<Note> getAllLectureNotesByCourseId(Integer courseId);
}
