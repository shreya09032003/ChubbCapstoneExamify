import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { QuizService } from '../../../services/quiz.service';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { MatDivider } from '@angular/material/divider';


@Component({
  selector: 'app-instructions',
  standalone: true, 
  imports: [
    MatCardModule,MatDivider],
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css'], // Fix typo: styleUrl -> styleUrls
})
export class InstructionsComponent implements OnInit {
  qid!: string;
  quiz: any = {}; // Changed to `any` (not array) assuming `getQuiz` fetches a single quiz object

  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    // Fetch 'qid' from the route
    this.qid = this._route.snapshot.params['qid'];

    // Call the QuizService to fetch quiz details
    this._quiz.getQuiz(this.qid).subscribe(
      (data: any) => {
        this.quiz = data;
      },
      (error: any) => {
        console.error('Error fetching quiz data:', error);
        Swal.fire('Error', 'Error in loading quiz data', 'error');
      }
    );
  }

  startQuiz() {
    Swal.fire({
      title: 'Do you want to start the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Start',
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        this._router.navigate(['/start/' + this.qid]);
      } else {
        Swal.fire('Quiz not started', '', 'info');
      }
    });
  }
}
