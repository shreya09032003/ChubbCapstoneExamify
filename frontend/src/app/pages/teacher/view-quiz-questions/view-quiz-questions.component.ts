import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginService } from '../../../services/login.service';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-view-quiz-questions',
  standalone: true,  // Optional: Use this if you want this component to be standalone
  imports: [MatCardModule, RouterLink, MatDividerModule, CommonModule,MatFormFieldModule],  // Import necessary modules
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css'],

})
export class ViewQuizQuestionsComponent implements OnInit {
  qId: any;
  qTitle: any;
  questions: any[] = [];
  questionLength: number | null = null;
  teacherId: number | null = null;
  maxQuestions: number | null = null;


  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _snak: MatSnackBar,
    private loginService: LoginService,
    private _quiz: QuizService
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    const user = this.loginService.getUser();
    this.teacherId = user.id;

    console.log(this.qId);


    this._quiz.getQuiz(this.qId).subscribe(
      (data: any) => {
        console.log(data.numberOfQuestions);
        this.maxQuestions = data.numberOfQuestions;
      },
      (error: any) => {
        console.error('Error fetching questions:', error);
      }
    );
    


    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data: any) => {
        console.log(data);
        this.questions = data;
        this.questionLength = data.length;
        console.log(this.questions.length);
      },
      (error: any) => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  // Delete Question
  deleteQuestion(qid: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure, want to delete this question?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Confirm deletion
        this._question.deleteQuestion(qid).subscribe(
          () => {
            this._snak.open('Question Deleted', '', {
              duration: 3000,
            });
            this.questions = this.questions.filter((q) => q.quesId !== qid);
          },
          (error: any) => {
            this._snak.open('Error in deleting question', '', {
              duration: 3000,
            });
            console.error('Error deleting question:', error);
          }
        );
      }
    });
  }
}

