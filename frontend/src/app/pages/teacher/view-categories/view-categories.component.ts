import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../services/category.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-view-categories',
  standalone: true,  // Optional: Standalone component, remove if not using standalone mode
  imports: [
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    CommonModule, // Always include CommonModule for directives like NgFor
    RouterLink

  ],
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {
  categories: any[] = [];
  teacherId: number | null = null;
  


  constructor(private _category: CategoryService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this._category.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error: any) => {
        console.error(error);
        Swal.fire('Error !!', 'Error in loading data', 'error');
      }
    );

    const user = this.loginService.getUser(); // Retrieve the user from the login service
    this.teacherId = user.id;


  }
}
