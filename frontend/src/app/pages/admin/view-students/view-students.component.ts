import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../services/teacher.service';
import Swal from 'sweetalert2';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../services/login.service';
@Component({
  selector: 'app-view-students',
  imports: [NgIf,NgFor,RouterLink],
  templateUrl: './view-students.component.html',
  styleUrl: './view-students.component.css'
})
export class ViewStudentsComponent implements OnInit {
   students: any[] = [];  // Store fetched teachers data
  loading: boolean = true;  // Show loading indicator

  constructor(private teachersService: TeacherService, 
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    // Fetch users with 'TEACHER' role
    this.teachersService.getUsersByRole('TEACHER').subscribe({
      next: (data: any[]) => {
        setTimeout(() => {
          this.students = data;  // Assign the fetched data after 3 seconds
          this.loading = false;  // Hide loading indicator after the delay
          console.log(this.students);
        }, 1000);  // 3-second delay before updating the view
      },
      
      error: (error: any) => {
        console.error('Error fetching teachers:', error);
        this.loading = false;
      }
    });
  }
  deleteStudent(userId: number): void {
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
            this.students = this.students.filter((student) => student.id !== userId);
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

   // Deactivate student
  //  deactivateStudent(userId: number): void {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'Do you want to deactivate this student?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#d33',
  //     cancelButtonColor: '#3085d6',
  //     confirmButtonText: 'Yes, deactivate it!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.loginService.updateUserStatus(userId, true).subscribe(
  //         (response: any) => {
  //           // Handle success response
  //           Swal.fire('Deactivated!', 'The student has been deactivated.', 'success');
            
  //           // Optionally, update the students list to reflect changes
  //           const studentIndex = this.students.findIndex(student => student.id === userId);
  //           if (studentIndex > -1) {
  //             this.students[studentIndex].enabled = 0; // Update status locally
  //           }
  //         },
  //         (error: any) => {
  //           // Handle error response
  //           console.error('Error deactivating student:', error);
  //           Swal.fire('Error!', 'There was an issue deactivating the student.', 'error');
  //         }
  //       );
  //     }
  //   });
  // }
  
  
}
