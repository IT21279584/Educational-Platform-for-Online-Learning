package com.example.courseservice.repository;

import com.example.courseservice.entity.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoRepository extends JpaRepository<Video, Integer> {
    List<Video> findByCourseCourseId(Integer courseId);
}
