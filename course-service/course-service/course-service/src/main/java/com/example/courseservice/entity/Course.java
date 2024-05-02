package com.example.courseservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "course")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "courseId")
    private Integer courseId;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "courseCode")
    private String courseCode;

    @JsonIgnore
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<Quiz> quizzes;

    @JsonIgnore
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<Video> videos;

    @Column(name = "userId")
    private Integer userId;


}
