import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { NgFor, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-update-quiz',
  imports: [FormsModule,NgIf,MatFormFieldModule,NgFor,NgForOf],
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css'
})
export class UpdateQuizComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _cat: CategoryService,
    private _router: Router
  ) {}

  qId = 0;
  quiz: any;
  categories: any[] = [];

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    // alert(this.qId);
    this._quiz.getQuiz(this.qId).subscribe(
      (data: any) => {
        this.quiz = data;
        console.log(this.quiz);
      },
      (error) => {
        console.log(error);
      }
    );

    this._cat.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        alert('error in loading categories');
      }
    );
  }

  //update form submit
  public updateData() {
    //validatate

    this._quiz.updateQuiz(this.quiz).subscribe(
      (data) => {
        Swal.fire('Success !!', 'quiz updated', 'success').then((e) => {
          this._router.navigate(['/admin/quizzes']);
        });
      },
      (error) => {
        Swal.fire('Error', 'error in updating quiz', 'error');
        console.log(error);
      }
    );
  }
}

