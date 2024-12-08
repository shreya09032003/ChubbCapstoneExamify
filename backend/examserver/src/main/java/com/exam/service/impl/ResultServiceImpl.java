package com.exam.service.impl;

import com.exam.model.Result;
import com.exam.repo.ResultRepository;
import com.exam.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultServiceImpl implements ResultService {

    private final ResultRepository resultRepository;

    @Autowired
    public ResultServiceImpl(ResultRepository resultRepository) {
        this.resultRepository = resultRepository;
    }


    // Save quiz result
    @Override
    public Result saveQuizResult(Result result) {
        return resultRepository.save(result);
    }

    // Get results by quizId
    @Override
    public List<Result> getResultsByQuizId(Long quizId) {
        return resultRepository.findByQuizId(quizId);
    }

    @Override
    public List<Result> getResultsByUserId(Long userId) {
        // Implement custom query logic as necessary
        return resultRepository.findAll(); // Placeholder for actual filtering logic
    }


}