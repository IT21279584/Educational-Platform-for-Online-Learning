package com.example.courseservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "video")
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "videoId")
    private Integer videoId;

    @Column(name = "description")
    private String description;

    @Column(name = "s3_url")
    private String s3Url;

    @ManyToOne
    @JoinColumn(name = "courseId")
    private Course course;
}

