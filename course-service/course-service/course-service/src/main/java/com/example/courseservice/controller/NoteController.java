package com.example.courseservice.controller;

import com.example.courseservice.entity.Note;
import com.example.courseservice.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @PostMapping("/upload/{courseId}")
    public ResponseEntity<String> uploadLectureNote(
            @PathVariable("courseId") Integer courseId,
            @RequestParam("title") String title,
            @RequestParam("file") MultipartFile file
    ) {
        try {
            // Upload lecture note to S3 and get the URL
            String s3Url = noteService.uploadLectureNote(courseId, title, file);

            // Return S3 URL to frontend
            return ResponseEntity.ok(s3Url);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload lecture note.");
        }
    }

    @GetMapping("/{courseId}")
    public List<Note> getAllNotesByCourseId(@PathVariable Integer courseId){
        return noteService.getAllLectureNotesByCourseId(courseId);
    }
}
