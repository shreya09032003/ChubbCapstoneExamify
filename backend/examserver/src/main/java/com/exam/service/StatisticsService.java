package com.exam.service;

public interface StatisticsService {

    // Get total marks by category
    Integer getTotalMarksByCategory(Long categoryId);

    // Get total number of attempts for the category
    Long getTotalAttemptsByCategory(Long categoryId);

    // Get average score by category
    Double getAverageScoreByCategory(Long categoryId);

    // Get total number of correct answers in the category
    Integer getTotalCorrectAnswersByCategory(Long categoryId);

    // Get total number of questions attempted in the category
    Integer getTotalQuestionsAttemptedByCategory(Long categoryId);
}
