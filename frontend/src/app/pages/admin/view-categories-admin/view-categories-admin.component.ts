import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-categories-admin',
  imports: [NgFor, RouterLink],
  templateUrl: './view-categories-admin.component.html',
  styleUrls: ['./view-categories-admin.component.css']
})
export class ViewCategoriesAdminComponent implements OnInit {
  categories: any[] = [];

  constructor(private _category: CategoryService) {}

  ngOnInit(): void {
    this._category.categories().subscribe(
      (data: any) => {
        this.categories = data.reverse();
        console.log(this.categories);
      },
      (error: any) => {
        console.error(error);
        Swal.fire('Error !!', 'Error in loading data', 'error');
      }
    );
  }

  // Delete category
  deleteCategory(categoryId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this category!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._category.deleteCategory(categoryId).subscribe(
          (response) => {
            this.categories = this.categories.filter((category) => category.cid !== categoryId);
            Swal.fire('Deleted!', 'Your category has been deleted.', 'success');
          },
          (error) => {
            console.error(error);
            Swal.fire('Error!', 'There was an error deleting the category.', 'error');
          }
        );
      }
    });
  }
}
