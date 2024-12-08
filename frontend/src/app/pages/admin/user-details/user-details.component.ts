import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from '../../../services/teacher.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-details',
  imports: [NgIf],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
 
  teacher: any = {};  // Store the teacher details
  loading: boolean = true;  // Show loading indicator

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    console.log(username);
      // Get the username from the URL
    if (username) {
      this.teacherService.getUserByUsername(username).subscribe({
        next: (data: any) => {
          this.teacher = data;  // Assign fetched teacher data
          this.loading = false;  // Hide loading indicator
        },
        error: (error: any) => {
          console.error('Error fetching teacher details:', error);
          this.loading = false;
        }
      });
    }
  }

}
