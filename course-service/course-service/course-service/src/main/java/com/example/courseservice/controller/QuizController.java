package com.example.courseservice.controller;

import com.example.courseservice.dto.QuizRequest;
import com.example.courseservice.entity.Quiz;
import com.example.courseservice.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @PostMapping("/{courseId}")
    public Quiz createQuiz(@PathVariable Integer courseId, @RequestBody QuizRequest quiz){
        return quizService.createQuiz(courseId, quiz);
    }
}
