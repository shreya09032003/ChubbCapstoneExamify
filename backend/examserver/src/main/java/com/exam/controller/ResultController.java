package com.exam.controller;

import com.exam.model.Result;
import com.exam.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/result")
@CrossOrigin("*")
public class ResultController {

    private final ResultService resultService;

    @Autowired
    public ResultController(ResultService resultService) {
        this.resultService = resultService;
    }

    // POST endpoint to save quiz result
    @PostMapping("/quiz-results")
    public ResponseEntity<Result> saveQuizResult(@RequestBody Result result) {
        Result savedResult = resultService.saveQuizResult(result);
        return new ResponseEntity<>(savedResult, HttpStatus.CREATED);
    }

    // Controller method to fetch quiz results by quiz ID
    @GetMapping("/quiz-results/{quizId}")
    public ResponseEntity<List<Result>> getQuizResults(@PathVariable Long quizId) {
        List<Result> results = resultService.getResultsByQuizId(quizId);
        return new ResponseEntity<>(results, HttpStatus.OK);
    }

}