package com.example.courseservice.repository;

import ch.qos.logback.core.model.INamedModel;
import com.example.courseservice.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Integer> {
    List<Note> findByCourseCourseId(Integer courseId);
}
