package com.example.courseservice.service;

import com.example.courseservice.dto.QuizRequest;
import com.example.courseservice.entity.Question;
import com.example.courseservice.entity.Quiz;

import java.util.List;

public interface QuizService {

    Quiz createQuiz(Integer courseId, QuizRequest quizRequest);
    List<Question> getAllQuestionsByQuizIdAndCourseId(Integer quizId, Integer courseId);

}
