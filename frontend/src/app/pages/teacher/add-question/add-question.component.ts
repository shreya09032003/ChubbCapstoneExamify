// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { QuestionService } from '../../../services/question.service';
// import Swal from 'sweetalert2';
// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { FormsModule } from '@angular/forms';
// import { MatOptionModule } from '@angular/material/core';
// import { CommonModule, NgIf } from '@angular/common';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// @Component({
//   selector: 'app-add-question',
//   standalone: true,  // Optional: Standalone component, remove if not using standalone mode
//   imports: [
//     MatCardModule,
//     MatFormFieldModule,
//     FormsModule,
//     MatOptionModule,
//     CommonModule,  // Necessary for NgIf and other Angular core directives
//     CKEditorModule,
//     NgIf,
//     MatFormFieldModule
//   ],
//   templateUrl: './add-question.component.html',
//   styleUrls: ['./add-question.component.css']
// })
// export class AddQuestionComponent implements OnInit {
//   public Editor = ClassicEditor;
//   qId: string | null = null;
//   qTitle: string | null = null;
//   question = {
//     quiz: {
//       qId: '',
//     },
//     content: '',
//     option1: '',
//     option2: '',
//     option3: '',
//     option4: '',
//     answer: '',
//   };


//   constructor(
//     private _route: ActivatedRoute,
//     private _question: QuestionService
//   ) {}

//   ngOnInit(): void {
//     this.qId = this._route.snapshot.params['qid'];
//     this.qTitle = this._route.snapshot.params['title'];
//     this.question.quiz.qId = this.qId!;
//   }

//   formSubmit(): void {
//     // Validate the form
//     if (this.question.content.trim() === '' || this.question.content == null) {
//       Swal.fire('Error', 'Question content is required', 'error');
//       return;
//     }

//     if (this.question.option1.trim() === '' || this.question.option1 == null) {
//       Swal.fire('Error', 'Option 1 is required', 'error');
//       return;
//     }
//     if (this.question.option2.trim() === '' || this.question.option2 == null) {
//       Swal.fire('Error', 'Option 2 is required', 'error');
//       return;
//     }
//     if (this.question.answer.trim() === '' || this.question.answer == null) {
//       Swal.fire('Error', 'Answer is required', 'error');
//       return;
//     }

//     // Submit the form data
//     this._question.addQuestion(this.question).subscribe(
//       (data: any) => {
//         Swal.fire('Success', 'Question Added. Add Another one', 'success');
//         this.resetForm();
//       },
//       (error) => {
//         Swal.fire('Error', 'Error in adding question', 'error');
//         console.error(error);
//       }
//     );
//   }

//   resetForm(): void {
//     this.question.content = '';
//     this.question.option1 = '';
//     this.question.option2 = '';
//     this.question.option3 = '';
//     this.question.option4 = '';
//     this.question.answer = '';
//   }
// }


import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgModel } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule, NgIf } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatOptionModule,
    CommonModule,
    CKEditorModule,
    NgIf,
    MatFormFieldModule,
    
  ],
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  public Editor = ClassicEditor;
  qId: string | null = null;
  qTitle: string | null = null;
  question = {
    quiz: {
      qId: '',
    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    type: 'MCQ', // Default to MCQ
  };

  questionTypes = ['MCQ', 'TRUE_FALSE', 'FILL_BLANK']; 
  totalQuestions = 0; // Total questions limit set by the teacher
  questionsAdded = 0; // Track questions added

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _quiz: QuizService
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this.question.quiz.qId = this.qId!;

    


    // Fetch total questions limit for the quiz
    this._quiz.getQuiz(this.qId!).subscribe((quizDetails: any) => {
      console.log(quizDetails.numberOfQuestions);
      
      this.totalQuestions = quizDetails.numberOfQuestions;
      this.questionsAdded = quizDetails.questionsAdded || 0;
    });
  }

  formSubmit(): void {
    if (this.questionsAdded >= this.totalQuestions) {
      Swal.fire('Limit Reached', 'Cannot add more questions.', 'warning');
      return;
    }

    if (this.question.content.trim() === '') {
      Swal.fire('Error', 'Question content is required', 'error');
      return;
    }

    if (this.question.type === 'MCQ') {
      if (this.question.option1.trim() === '' || this.question.option2.trim() === '') {
        Swal.fire('Error', 'At least two options are required for MCQ', 'error');
        return;
      }
    } else if (this.question.type !== 'MCQ' && this.question.answer.trim() === '') {
      Swal.fire('Error', 'Answer is required', 'error');
      return;
    }

    this._question.addQuestion(this.question).subscribe(
      () => {
        Swal.fire('Success', 'Question Added. Add Another one', 'success');
        this.questionsAdded++;
        this.resetForm();
      },
      (error) => {
        Swal.fire('Error', 'Failed to add question', 'error');
        console.error(error);
      }
    );
  }

  resetForm(): void {
    this.question.content = '';
    this.question.option1 = '';
    this.question.option2 = '';
    this.question.option3 = '';
    this.question.option4 = '';
    this.question.answer = '';
    this.question.type = 'MCQ';
  }
}