package com.example.courseservice.repository;

import ch.qos.logback.core.model.INamedModel;
import com.example.courseservice.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Integer> {
}
