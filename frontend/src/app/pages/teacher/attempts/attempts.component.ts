import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-attempts',
  imports: [NgFor],
  templateUrl: './attempts.component.html',
  styleUrl: './attempts.component.css'
})
export class AttemptsComponent implements OnInit {
  quizId: number | null = null;
  results: any[] = [];
  quizTitle: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    // Retrieve the quiz ID from the route parameters
    this.quizId = +this.activatedRoute.snapshot.paramMap.get('qid')!;
    console.log(this.quizId);
    // log the title of the quiz

    
    
    // Fetch the results of students who attempted this quiz
    if (this.quizId) {
      this.fetchQuizResults(this.quizId);
    }
  }

  fetchQuizResults(quizId: number): void {
    this.quizService.getQuizResults(quizId).subscribe(
      (data: any) => {
        this.results = data;
        console.log(this.results);
        console.log(this.results[0].maxMarks);
        this.quizTitle = this.results[0].quizTitle;
        
      },
      (error) => {
        console.error('Error fetching quiz results:', error);
        Swal.fire('Error!', 'Failed to load quiz results.', 'error');
      }
    );
  }
}