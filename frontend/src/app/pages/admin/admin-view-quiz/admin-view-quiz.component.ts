import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-admin-view-quiz',
  imports: [NgFor],
  templateUrl: './admin-view-quiz.component.html',
  styleUrl: './admin-view-quiz.component.css'
})
export class AdminViewQuizComponent implements OnInit {
  quizzes: any[] = [];

  constructor(private _quiz: QuizService, private _http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const cid = this.route.snapshot.paramMap.get('cid');
    console.log(cid);

    this._quiz.getQuizzesOfCategory(cid).subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      (error) => {
        console.error('Error loading quizzes:', error);
        Swal.fire('Error !', 'Error in loading data !', 'error');
      }
    );
  }
}
