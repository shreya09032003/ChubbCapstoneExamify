package com.exam.controller;

import com.exam.service.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/statistics")
@CrossOrigin("*")
public class StatisticsController {

    @Autowired
    private StatisticsService statisticsService;

    // Endpoint to get the total marks by category
    @GetMapping("/total-marks/{categoryId}")
    public Integer getTotalMarksByCategory(@PathVariable Long categoryId) {
        return statisticsService.getTotalMarksByCategory(categoryId);
    }

    // Endpoint to get the total number of attempts by category
    @GetMapping("/total-attempts/{categoryId}")
    public Long getTotalAttemptsByCategory(@PathVariable Long categoryId) {
        return statisticsService.getTotalAttemptsByCategory(categoryId);
    }

    // Endpoint to get average score by category
    @GetMapping("/average-score/{categoryId}")
    public Double getAverageScoreByCategory(@PathVariable Long categoryId) {
        return statisticsService.getAverageScoreByCategory(categoryId);
    }

    // Endpoint to get total correct answers by category
    @GetMapping("/total-correct-answers/{categoryId}")
    public Integer getTotalCorrectAnswersByCategory(@PathVariable Long categoryId) {
        return statisticsService.getTotalCorrectAnswersByCategory(categoryId);
    }

    // Endpoint to get total questions attempted by category
    @GetMapping("/total-questions-attempted/{categoryId}")
    public Integer getTotalQuestionsAttemptedByCategory(@PathVariable Long categoryId) {
        return statisticsService.getTotalQuestionsAttemptedByCategory(categoryId);
    }
}
