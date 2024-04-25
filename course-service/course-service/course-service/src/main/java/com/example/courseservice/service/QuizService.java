package com.example.courseservice.service;

import com.example.courseservice.dto.QuizRequest;
import com.example.courseservice.entity.Quiz;

public interface QuizService {

    Quiz createQuiz(Integer courseId, QuizRequest quizRequest);
}
