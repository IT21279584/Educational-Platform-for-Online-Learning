package com.example.courseservice.controller;

import com.example.courseservice.dto.QuizRequest;
import com.example.courseservice.entity.Question;
import com.example.courseservice.entity.Quiz;
import com.example.courseservice.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @PostMapping("/{courseId}")
    public Quiz createQuiz(@PathVariable Integer courseId, @RequestBody QuizRequest quiz){
        return quizService.createQuiz(courseId, quiz);
    }

    @GetMapping("/{quizId}/courses/{courseId}/questions")
    public ResponseEntity<List<Question>> getAllQuestionsByQuizIdAndCourseId(@PathVariable Integer quizId, @PathVariable Integer courseId) {
        List<Question> questions = quizService.getAllQuestionsByQuizIdAndCourseId(quizId, courseId);
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }
}
