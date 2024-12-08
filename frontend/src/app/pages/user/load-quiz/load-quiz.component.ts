import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { CategoryService } from '../../../services/category.service';
import { LoginService } from '../../../services/login.service';
import { MatCard, MatCardContent } from '@angular/material/card';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css'],
  imports:[MatCard, MatCardContent, NgFor, NgIf, RouterLink,NgClass,CommonModule]
})
export class LoadQuizComponent implements OnInit {
  catId!: number;
  quizzes: any[]=[];
  categories: any;
  userId: number | null = null;

  constructor(
    private _route: ActivatedRoute, 
    private _quiz: QuizService,
    private _categoryService: CategoryService,
    private loginService: LoginService

  ) {}

  ngOnInit(): void {
    const user = this.loginService.getUser(); // Retrieve the user from the login service
    this.userId = user.id;
    console.log(this.userId);
    this._categoryService.categories().subscribe(
      (data: any) => {
        this.categories = data.reverse();
      },
      (error) => {
        console.error('Error fetching categories', error);
        alert('Error loading categories');
      }
    );

    // Check if a category is provided in the URL
    this._route.params.subscribe((params) => {
      this.catId = params['catId'];
      console.log(this.catId);
      
      this.loadQuizzes(this.catId);
    });
  }

  // Load quizzes based on the category
  loadQuizzes(catId: number) {
    if (catId == 0) {
      this._quiz.quizzes().subscribe(
        (data: any) => {
          this.quizzes = data;  // Ensure that 'active' field is included in the quiz object
        },
        (error) => {
          alert('Error in loading quizzes');
        }
      );
    } else {
      this._quiz.getQuizzesOfCategory(catId).subscribe(
        (data: any) => {
          this.quizzes = data;
        },
        (error) => {
          alert('Error loading quizzes for this category');
        }
      );
    }
  }
  
  // Filter quizzes based on selected category
  filterQuizzesByCategory(categoryId: number) {
    this.catId = categoryId;
    this.loadQuizzes(this.catId);
  }

  // Reset filter to show all quizzes (All Categories)
  resetFilter() {
    this.catId = 0; // When 'All Categories' is clicked, set catId to 0
    this.loadQuizzes(0); // Load all quizzes across all categories
  }
}
