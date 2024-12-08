package com.exam.service;

import com.exam.model.Result;

import java.util.List;

public interface ResultService {

    Result saveQuizResult(Result result);
    List<Result> getResultsByUserId(Long userId);
    List<Result> getResultsByQuizId(Long quizId);
}
