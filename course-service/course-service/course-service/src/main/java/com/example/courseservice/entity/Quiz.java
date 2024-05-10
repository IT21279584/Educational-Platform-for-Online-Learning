package com.example.courseservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "quiz")
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quizId")
    private Integer quizId;

    @Column(name = "title")
    private String title;

    @ManyToOne
    @JoinColumn(name = "courseId")
    private Course course;

    @JsonIgnore
    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL)
    private List<Question> questionList  = new ArrayList<>();;

    public void addQuestion(Question question) {
        questionList.add(question);
        question.setQuiz(this);
    }
}
