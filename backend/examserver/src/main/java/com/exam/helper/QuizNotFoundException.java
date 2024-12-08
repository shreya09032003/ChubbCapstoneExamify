package com.exam.helper;

public class QuizNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public QuizNotFoundException(Long quizId) {
        super("Quiz not found with ID: " + quizId);
    }
}
