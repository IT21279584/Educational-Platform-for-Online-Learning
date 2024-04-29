package com.example.courseservice.service.Impl;

import com.example.courseservice.dto.QuestionRequest;
import com.example.courseservice.dto.QuizRequest;
import com.example.courseservice.entity.Course;
import com.example.courseservice.entity.Question;
import com.example.courseservice.entity.Quiz;
import com.example.courseservice.repository.CourseRepository;
import com.example.courseservice.repository.QuizRepository;
import com.example.courseservice.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private CourseRepository courseRepository;
    @Override
    public Quiz createQuiz(Integer courseId, QuizRequest quizRequest) {
        Quiz quiz = new Quiz();
        quiz.setTitle(quizRequest.getTitle());

        List<Question> questions = new ArrayList<>();
        for(QuestionRequest questionRequest : quizRequest.getQuestions()){
            Question question = new Question();
            question.setQuestion(questionRequest.getQuestion());
            question.setOptions(questionRequest.getOptions());
            question.setCorrectOptionIndex(questionRequest.getCorrectOptionIndex());
            question.setQuiz(quiz);
            quiz.addQuestion(question);

            Optional<Course> course = courseRepository.findById(courseId);
            quiz.setCourse(course.get());

        }

        return quizRepository.save(quiz);
    }

    @Override
    public List<Question> getAllQuestionsByQuizIdAndCourseId(Integer quizId, Integer courseId) {
        Optional<Quiz> quizOptional = quizRepository.findById(quizId);
        if (quizOptional.isPresent()) {
            Quiz quiz = quizOptional.get();
            if (quiz.getCourse().getCourseId().equals(courseId)) {
                return quiz.getQuestionList();
            } else {
                throw new IllegalArgumentException("Quiz with ID " + quizId + " is not associated with Course ID " + courseId);
            }
        } else {
            throw new IllegalArgumentException("Quiz with ID " + quizId + " not found");
        }
    }
}
