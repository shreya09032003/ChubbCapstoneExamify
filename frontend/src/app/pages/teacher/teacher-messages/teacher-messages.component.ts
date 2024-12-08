import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
import { CommonModule, DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-teacher-messages',
  templateUrl: './teacher-messages.component.html',
  styleUrls: ['./teacher-messages.component.css'],
  imports: [NgIf, CommonModule]
})
export class TeacherMessagesComponent implements OnInit {
  notifications: any[] = [];
  role = 'teacher'; // Set the role dynamically based on logged-in user (just an example)
  selectedNotification: any; // To store the selected notification for details view

  constructor(
    private notificationService: NotificationService,
    private datePipe: DatePipe // Inject DatePipe
  ) {}

  ngOnInit(): void {
    // Fetch notifications for the teacher
    console.log(this.role);
    
    this.notificationService.getNotifications(this.role.toUpperCase()).subscribe(
      (data) => {
        this.notifications = data.reverse();
        console.log('Fetched notifications:', this.notifications);
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }

  // Function to format the timestamp using DatePipe
  formatTimestamp(timestamp: string): string {
    return this.datePipe.transform(timestamp, 'short') || '';  // Formats the timestamp
  }

  // Function to open the notification details when clicked
  openNotification(notification: any): void {
    this.selectedNotification = notification;
  }

  // Function to close the notification details
  closeNotification(): void {
    this.selectedNotification = null; // Resets the selected notification
  }
}
