package com.example.courseservice.dto;

import java.util.List;

public class QuizRequest {

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<QuestionRequest> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionRequest> questions) {
        this.questions = questions;
    }

    private String title;
    private List<QuestionRequest> questions;


}
