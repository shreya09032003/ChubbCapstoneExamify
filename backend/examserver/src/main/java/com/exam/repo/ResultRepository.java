package com.exam.repo;

import com.exam.model.Result;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Result> findByQuizId(Long quizId);

    // Get results by category and quizId
    @Query("SELECT r FROM Result r WHERE r.quizCategoryId = :categoryId AND r.quizId = :quizId")
    List<Result> findByCategoryAndQuizId(Long categoryId, Long quizId);

    // Get total marks for the given category
    @Query("SELECT SUM(r.marksGot) FROM Result r WHERE r.quizCategoryId = :categoryId")
    Integer getTotalMarksByCategory(Long categoryId);

    // Get total number of attempts for the category
    @Query("SELECT COUNT(r) FROM Result r WHERE r.quizCategoryId = :categoryId")
    Long getTotalAttemptsByCategory(Long categoryId);

    // Get average score for the given category
    @Query("SELECT AVG(r.marksGot) FROM Result r WHERE r.quizCategoryId = :categoryId")
    Double getAverageScoreByCategory(Long categoryId);

    // Get the number of correct answers in a category
    @Query("SELECT SUM(r.correctAnswers) FROM Result r WHERE r.quizCategoryId = :categoryId")
    Integer getTotalCorrectAnswersByCategory(Long categoryId);

    // Get the total number of questions attempted in the given category
    @Query("SELECT SUM(r.questionsAttempted) FROM Result r WHERE r.quizCategoryId = :categoryId")
    Integer getTotalQuestionsAttemptedByCategory(Long categoryId);
}