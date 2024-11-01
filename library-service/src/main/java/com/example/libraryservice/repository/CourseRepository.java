package com.example.libraryservice.repository;

import com.example.libraryservice.entity.CourseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CourseRepository extends JpaRepository<CourseEntity, Integer> {
    @Query("SELECT u FROM CourseEntity u WHERE u.id = :id")
    List<CourseEntity> findByCourseId(int id);

}
