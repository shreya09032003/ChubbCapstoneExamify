import { Component, OnInit } from '@angular/core';
import { UserviceService } from '../../services/uservice.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'NORMAL', // default role
    categoryId: -1, // for storing selected category when role is teacher
  };

  categories: any[] = []; // Array to store categories

  constructor(
    private userService: UserviceService,
    private categoryService: CategoryService, // Inject CategoryService
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Fetch categories when the component is initialized
    this.categoryService.categories().subscribe(
      (data: any) => {
        this.categories = data; // Set the categories data
        console.log(this.categories);
      },
      (error) => {
        console.error('Error loading categories', error);
        this.snack.open('Error loading categories', '', {
          duration: 3000,
        });
      }
    );
  }

  resetForm() {
    this.user = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: 'NORMAL', // reset to default role
      categoryId: -1, // reset category as well
    };
  }

  formSubmit() {
    console.log(this.user);

    // Form validation and submission logic
    if (this.user.username == '' || this.user.username == null) {
      this.snack.open('Username is required !! ', '', {
        duration: 3000,
      });
      return;
    }
    if (this.user.password == '' || this.user.password == null) {
      this.snack.open('Password is required !! ', '', {
        duration: 3000,
      });
      return;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!this.user.email || !emailPattern.test(this.user.email)) {
      this.snack.open('Please enter a valid email address', '', {
        duration: 3000,
      });
      return;
    }
    const phonePattern = /^\d{10}$/;
    if (!this.user.phone || !phonePattern.test(this.user.phone)) {
      this.snack.open('Please enter a valid 10-digit phone number', '', {
        duration: 3000,
      });
      return;
    }
    

    // Check if categoryId is selected (required for roles like teacher)
    if (   this.user.categoryId === null || this.user.categoryId === undefined) {
      this.snack.open('Please select a category', '', {
        duration: 3000,
      });
      return;
    }

    // Submit user registration
    this.userService.addUser(this.user, this.user.categoryId).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire('Successfully done !!', 'User id is ' + data.id, 'success');
      },
      (error) => {
        console.error(error);
        // Optionally show error message
        // this.snack.open(error.error.text, '', {
        //   duration: 3000,
        // });
      }
    );
}

}
