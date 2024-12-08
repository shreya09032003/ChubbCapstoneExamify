
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-add-quiz',
  imports: [FormsModule,CommonModule,MatFormFieldModule,MatInputModule],
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent implements OnInit {
  categories: any[] = [];
  teacherId: number | null = null;
  categoryTitle: string = '';

  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cid: '',
    },
  };

  constructor(
    private _snack: MatSnackBar,
    private _quiz: QuizService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const user = this.loginService.getUser(); // Retrieve the logged-in user
    this.teacherId = user.id;

    // Set the category details
    this.categoryTitle = user.category.title;
    this.quizData.category.cid = user.category.cid; // Pre-fill category ID
  }

  // Automatically update maxMarks based on numberOfQuestions
  updateMaxMarks() {
    if (this.quizData.numberOfQuestions) {
      const numberOfQuestions = parseInt(this.quizData.numberOfQuestions, 10);
      if (!isNaN(numberOfQuestions) && numberOfQuestions > 0) {
        this.quizData.maxMarks = numberOfQuestions.toString(); // Sync maxMarks
      } else {
        this.quizData.maxMarks = ''; // Reset if input is invalid
      }
    } else {
      this.quizData.maxMarks = ''; // Reset if input is empty
    }
  }

  // Add quiz method
  addQuiz() {
    if (this.quizData.title.trim() === '' || this.quizData.title == null) {
      this._snack.open('Title Required !!', '', {
        duration: 3000,
      });
      return;
    }

    // Validation and call to server
    this._quiz.addQuiz(this.quizData).subscribe(
      (data) => {
        Swal.fire('Success', 'Quiz is added', 'success');
        this.quizData = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestions: '',
          active: true,
          category: {
            cid: this.quizData.category.cid, // Retain the category ID
          },
        };
      },
      (error) => {
        Swal.fire('Error!! ', 'Error while adding quiz', 'error');
        console.log(error);
      }
    );
  }
}
