package com.example.courseservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "question")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "questionId")
    private Integer questionId;

    @Column(name = "question")
    private String question;

    @Column(name = "options")
    private List<String> options;

    @Column(name = "correctOptionIndex")
    private Integer correctOptionIndex;

    @ManyToOne
    @JoinColumn(name = "quizId")

    private Quiz quiz;

}
