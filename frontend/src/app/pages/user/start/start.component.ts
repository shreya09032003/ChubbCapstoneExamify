import { CommonModule, LocationStrategy, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';
import { QuestionService } from '../../../services/question.service';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { jsPDF } from 'jspdf';
import { MatSpinner } from '@angular/material/progress-spinner';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-start',
  imports: [
    CommonModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions,
    MatDivider,
    MatSpinner,
    FormsModule,
    NgFor,
    NgIf,
    RouterLink
  ],
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  qid: any;
  questions: any[] = [];
  userName: string = ''; // To store user's name
  quizDetails: any = {}; // To store quiz details
  userId: number | null = null;
  quizTitle: string = '';
  quizDescription: string = '';
 
  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;

  isSubmit = false;
  timer: number = 0;

  private timerInterval: any;
 

  constructor(
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _quiz: QuizService,
    private cdRef: ChangeDetectorRef,
    private _login: LoginService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    console.log(`Quiz ID: ${this.qid}`);
  
    
    this.questions;
    this.quizDetails;
    this.userName;
    this.enterFullscreen();
    // Listen to fullscreen change event
    document.addEventListener('fullscreenchange', this.onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', this.onFullscreenChange);  // For Safari
    document.addEventListener('msfullscreenchange', this.onFullscreenChange);  // For IE11

    this.loadUserName();
    this.loadQuestions();
    this.loadQuizDetails();


  }

  // Extend the HTMLElement interface to include webkitRequestFullscreen and msRequestFullscreen
// interface HTMLElement {
//   webkitRequestFullscreen?: () => void;
//   msRequestFullscreen?: () => void;
// }

 enterFullscreen() {
  const elem = document.documentElement;  // No need for 'as HTMLElement' anymore

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.requestFullscreen) {  // Safari
    elem.requestFullscreen();
  } else if (elem.requestFullscreen) {  // IE11
    elem.requestFullscreen();
  }
}

 exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.exitFullscreen) {  // Safari
    document.exitFullscreen();
  } else if (document.exitFullscreen) {  // IE11
    document.exitFullscreen();
  }
}

  // Add event listener callback for fullscreen change
  onFullscreenChange = () => {
    if (!document.fullscreenElement && !document.fullscreenElement && !document.fullscreenElement) {
      // If not in fullscreen mode anymore, show a warning
      Swal.fire({
        title: 'Warning!',
        text: 'You are leaving fullscreen mode. Are you sure you want to exit fullscreen?',
        icon: 'warning',
        confirmButtonText: 'Stay in Fullscreen',
        showCancelButton: true,
        cancelButtonText: 'Exit Fullscreen'
      }).then(result => {
        if (result.isConfirmed) {
          // User wants to stay in fullscreen, so we call enterFullscreen again
          this.enterFullscreen();
        } else {
          // Allow them to exit fullscreen
          this.exitFullscreen();
        }
      });
    }
  }


  

  loadUserName(): void {
    const user = this._login.getUser();
   this.userId = user.id;
    console.log(user.id);
    
    if (user) {
      this.userName = user.username;
    } else {
      console.warn('No user logged in.');
    }
  }

  loadQuestions(): void {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data: any) => {
        this.questions = data;
        console.log(this.questions);
        console.log(this.questions[0].quiz.title);
        this.quizTitle = this.questions[0]?.quiz.title;
        this.quizDescription = this.questions[0]?.quiz.description;
        console.log(this.quizDescription);
        
  
        // Check if the quiz has no questions
        if (this.questions.length === 0) {
          Swal.fire({
            title: 'No Questions Available',
            text: 'There are no questions in this quiz. Please go back to the dashboard.',
            icon: 'info',
            confirmButtonText: 'Go to Dashboard'
          }).then(() => {
            this._router.navigate([`/user-dashboard/${this.userId}`]);
          });
          return; // Stop further execution if no questions are available
        }
  
        // Check if timer is already stored in localStorage
        const savedTimer = localStorage.getItem(`quiz-timer-${this.qid}`);
        if (savedTimer != null) {
          this.timer = parseInt(savedTimer, 10);
        } else {
          this.timer = this.questions.length * 30; // Set initial time
        }
  
        console.log('Questions loaded:', this.questions);
        this.startTimer();
      },
      (error: any) => {
        console.error('Error loading questions:', error);
        Swal.fire('Error', 'Error loading quiz questions.', 'error');
      }
    );
  }
  

  loadQuizDetails(): void {
    this._quiz.getQuiz(this.qid).subscribe(
      (data: any) => {
        this.quizDetails = data;
        console.log('Quiz details loaded:', this.quizDetails);
      },
      (error: any) => {
        console.error('Error loading quiz details:', error);
      }
    );
  }

 

  preventBackButton(): void {
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  startTimer(): void {
    this.timerInterval = setInterval(() => {
      if (this.timer <= 0) {
        clearInterval(this.timerInterval);
        this.evalQuiz();
      } else {
        this.timer--;
        localStorage.setItem(`quiz-timer-${this.qid}`, this.timer.toString());
        this.cdRef.detectChanges(); // Ensures UI updates for timer
      }
    }, 1000);
  }

  getFormattedTime(): string {
    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer % 60;
    return `${minutes} min : ${seconds} sec`;
  }
  submitQuiz(): void {
    const unansweredQuestions = this.questions.filter(q => !q.givenAnswer);
  
    if (unansweredQuestions.length > 0) {
      Swal.fire({
        title: 'Unanswered Questions!',
        text: `You have ${unansweredQuestions.length} unanswered questions. Are you sure you want to submit?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Submit Anyway',
        cancelButtonText: 'Go Back'
      }).then((result) => {
        if (result.isConfirmed) {
          clearInterval(this.timerInterval);
          localStorage.removeItem(`quiz-timer-${this.qid}`);
          this.evalQuiz();
        }
      });
    } else {
      Swal.fire({
        title: 'Submit Quiz?',
        text: 'Are you sure you want to submit the quiz?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Submit'
      }).then((result) => {
        if (result.isConfirmed) {
          clearInterval(this.timerInterval);
          localStorage.removeItem(`quiz-timer-${this.qid}`);
          this.evalQuiz();
        }
      });
    }
  }
  

  evalQuiz(): void {
    this._question.evalQuiz(this.questions).subscribe(
      (data: any) => {
        console.log('Evaluation result:', data);
        this.marksGot = data.marksGot;
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted;
        this.isSubmit = true;
  
        // Prepare the result object with required details
        const result1 = {
          username: this.userName, // User's name
          userId: this.userId, // User ID
          quizTitle: this.quizTitle, // Quiz title
          quizId: this.qid, // Quiz ID
          totalQuestions: this.questions.length, // Total questions in the quiz
          marksGot: this.marksGot, // Marks obtained
          correctAnswers: this.correctAnswers, // Correct answers
          attempted: this.attempted, // Number of attempted questions
          quizCategory: this.quizDetails.category.title, // Quiz category
          quizCategoryId: this.quizDetails.category.cid, // Quiz category ID
          maxMarks: this.quizDetails.maxMarks // Maximum marks for the quiz
        };
  
        // Log the result object to the console (for debugging purposes)
        console.log('Result details:', result1);
  
        // Send this result object to your backend to store it in the database
        this.saveQuizResult(result1);
  
        // Clear timer from localStorage after submission
        localStorage.removeItem(`quiz-timer-${this.qid}`);
      },
      (error: any) => {
        console.error('Error during evaluation:', error);
      }
    );
  }

  saveQuizResult(result1: any): void {
    this._quiz.saveQuizResult(result1).subscribe(
      (response: any) => {
     
        console.log('Result saved successfully:', response);
        // You can redirect to a result page or show a success message here
      },
      (error: any) => {
        console.log(result1);
        
        console.error('Error saving result:', error);
      }
    );
  }
  
  
  // downloadPDF(): void {
  //   const doc = new jsPDF();

  //   doc.setFontSize(16);
  //   doc.text('Quiz Result', 20, 20);

  //   doc.setFontSize(12);
  //   doc.text(`Marks Got: ${this.marksGot}`, 20, 40);
  //   doc.text(`Correct Answers: ${this.correctAnswers}`, 20, 50);
  //   doc.text(`Questions Attempted: ${this.attempted}`, 20, 60);

  //   doc.save('quiz-result.pdf');
  // }


  downloadPDF() {
    const doc = new jsPDF();
  
    // Add title
    doc.setFontSize(20);
    doc.text("Quiz Result Report", 20, 20);
  
    // Add user details
    doc.setFontSize(14);
    doc.text(`User Name: ${this.userName}`, 20, 30);
  
    // Add quiz details
    doc.text(`Quiz Title: ${this.quizDetails.title}`, 20, 40);
    doc.text(`Quiz Description: ${this.quizDetails.description}`, 20, 50);
  
    // Add questions and answers
    let yPosition = 60;  // Start position for questions
    doc.text('Questions and Answers:', 20, yPosition);
    yPosition += 10;
  
    this.questions.forEach((q, index) => {
      doc.text(`Q${index + 1}: ${q.content}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Answer: ${q.givenAnswer}`, 20, yPosition);
      yPosition += 15;
    });
  
    // Add performance summary
    doc.text('Performance Summary:', 20, yPosition);
    yPosition += 10;
  
    doc.text(`Total Questions: ${this.questions.length}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Correct Answers: ${this.correctAnswers}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Attempted Questions: ${this.attempted}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Marks Obtained: ${this.marksGot}`, 20, yPosition);
    yPosition += 10;
  
    // Generate PDF
    doc.save('quiz-result.pdf');
  }
  

}
