package com.exam.service.impl;

import com.exam.repo.ResultRepository;
import com.exam.service.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatisticsServiceImpl implements StatisticsService {
    @Autowired
    private ResultRepository resultRepository;

    // Get total marks by category
    public Integer getTotalMarksByCategory(Long categoryId) {
        return resultRepository.getTotalMarksByCategory(categoryId);
    }

    // Get total number of attempts for the category
    public Long getTotalAttemptsByCategory(Long categoryId) {
        return resultRepository.getTotalAttemptsByCategory(categoryId);
    }

    // Get average score by category
    public Double getAverageScoreByCategory(Long categoryId) {
        return resultRepository.getAverageScoreByCategory(categoryId);
    }

    // Get total number of correct answers in the category
    public Integer getTotalCorrectAnswersByCategory(Long categoryId) {
        return resultRepository.getTotalCorrectAnswersByCategory(categoryId);
    }

    // Get total number of questions attempted in the category
    public Integer getTotalQuestionsAttemptedByCategory(Long categoryId) {
        return resultRepository.getTotalQuestionsAttemptedByCategory(categoryId);
    }
}
