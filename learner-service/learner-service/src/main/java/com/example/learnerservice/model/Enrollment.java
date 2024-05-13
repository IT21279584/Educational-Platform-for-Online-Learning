package com.example.learnerservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "enrollment")
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer enrollId;

    @Column(name = "userId")
    private Integer userId;

    @Column(name = "courseId")
    private Integer courseId;

    @Column(name = "courseTitle") // New field for course title
    private String courseTitle; // New field for course title
}
