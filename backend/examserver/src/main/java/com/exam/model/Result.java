package com.exam.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "result")
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String username;
    private String quizTitle;
    private Long quizId;

    @JsonProperty("maxMarks")
    public Integer getMaximumMarks() {
        return maximumMarks;
    }

    public void setMaximumMarks(Integer maximumMarks) {
        this.maximumMarks = maximumMarks;
    }

    public Long getQuizCategoryId() {
        return quizCategoryId;
    }

    public void setQuizCategoryId(Long quizCategoryId) {
        this.quizCategoryId = quizCategoryId;
    }

    public String getQuizCategory() {
        return quizCategory;
    }

    public void setQuizCategory(String quizCategory) {
        this.quizCategory = quizCategory;
    }

    @JsonProperty("attempted")
    public Integer getQuestionsAttempted() {
        return questionsAttempted;
    }

    public void setQuestionsAttempted(Integer questionsAttempted) {
        this.questionsAttempted = questionsAttempted;
    }

    public Integer getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(Integer correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

    public Integer getMarksGot() {
        return marksGot;
    }

    public void setMarksGot(Integer marksGot) {
        this.marksGot = marksGot;
    }

    public Integer getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(Integer totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public Long getQuizId() {
        return quizId;
    }

    public void setQuizId(Long quizId) {
        this.quizId = quizId;
    }

    public String getQuizTitle() {
        return quizTitle;
    }

    public void setQuizTitle(String quizTitle) {
        this.quizTitle = quizTitle;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    private Integer totalQuestions;
    private Integer marksGot;
    private Integer correctAnswers;
    private Integer questionsAttempted;
    private String quizCategory;
    private Long quizCategoryId;
    private Integer maximumMarks;

    @Override
    public String toString() {
        return "Result{" +
                "id=" + id +
                ", userId=" + userId +
                ", username='" + username + '\'' +
                ", quizTitle='" + quizTitle + '\'' +
                ", quizId=" + quizId +
                ", totalQuestions=" + totalQuestions +
                ", marksGot=" + marksGot +
                ", correctAnswers=" + correctAnswers +
                ", questionsAttempted=" + questionsAttempted +
                ", quizCategory='" + quizCategory + '\'' +
                ", quizCategoryId=" + quizCategoryId +
                ", maximumMarks=" + maximumMarks +
                '}';
    }
}
