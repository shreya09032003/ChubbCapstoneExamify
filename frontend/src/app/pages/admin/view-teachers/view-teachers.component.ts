import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../services/teacher.service';
import { NgFor, NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-teachers',
  imports: [NgIf, NgFor,RouterLink],
  templateUrl: './view-teachers.component.html',
  styleUrls: ['./view-teachers.component.css']
})
export class ViewTeachersComponent implements OnInit {

  teachers: any[] = [];  // Store fetched teachers data
  loading: boolean = true;  // Show loading indicator

  constructor(private teachersService: TeacherService) {}

  ngOnInit(): void {
    // Fetch users with 'TEACHER' role
    this.teachersService.getUsersByRole('TEACHER').subscribe({
      next: (data: any[]) => {
        setTimeout(() => {
          this.teachers = data;  // Assign the fetched data after 3 seconds
          this.loading = false;  // Hide loading indicator after the delay
          console.log(this.teachers);
        }, 1000);  // 3-second delay before updating the view
      },
      
      error: (error: any) => {
        console.error('Error fetching teachers:', error);
        this.loading = false;
      }
    });
  }

  deleteTeacher(userId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this student!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.teachersService.deleteUser(userId).subscribe(
          (response: any) => {
            // Remove the deleted student from the list
            this.teachers = this.teachers.filter((teacher) => teacher.id !== userId);
            Swal.fire('Deleted!', 'The teacher has been deleted.', 'success');
          },
          (error: any) => {
            console.error('Error deleting teacher:', error);
            Swal.fire('Error!', 'There was an error deleting the teacher.', 'error');
          }
        );
      }
    });
  }
}
