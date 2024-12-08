import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { QuizService } from '../../../services/quiz.service';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-view-quizzes',
  standalone: true,
  imports: [MatCardModule, RouterLink, CommonModule],
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
  quizzes: any[] = [];
  teacherId: number | null = null;

  constructor(
    private _quiz: QuizService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const user = this.loginService.getUser();
    this.teacherId = user.id;

    this._quiz.getQuizzesOfCategory(user.category.cid).subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes[0].numberOfQuestions);
        console.log(this.quizzes);
        
        
      },
      (error) => {
        console.error('Error loading quizzes:', error);
        Swal.fire('Error !', 'Error in loading data !', 'error');
      }
    );
  }

  // Toggle Quiz Status
  toggleStatus(quiz: any): void {
    this._quiz.toggleQuizStatus(quiz.qId).subscribe(
      (data: any) => {
        quiz.active = data.active;
         // Update the quiz status in the frontend
         
         
        Swal.fire(
          'Success!',
          `Quiz ${data.active ? 'activated' : 'deactivated'} successfully.`,
          'success'
        );
      },
      (error) => {
        console.log(quiz.qId);
        console.log(quiz);
        
        console.error('Error toggling quiz status:', error);
        Swal.fire('Error!', 'There was an issue toggling the quiz status.', 'error');
      }
    );
  }
}
