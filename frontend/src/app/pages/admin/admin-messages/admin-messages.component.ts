import { Component } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-notifications',
  imports:[CommonModule,FormsModule],
  templateUrl: './admin-messages.component.html',
  styleUrls: ['./admin-messages.component.css']
})
export class AdminMessagesComponent {
  subject: string = '';
  description: string = '';
  role: string = ''; // 'normal', 'teacher', or 'both'

  constructor(private notificationService: NotificationService) {}

  sendNotification() {
    if (this.subject && this.description && this.role) {
      const notificationData = {
        subject: this.subject,
        description: this.description,
        role: this.role,
      };
      
      this.notificationService.sendNotification(notificationData).subscribe(response => {
        alert('Notification sent successfully!');
      }, error => {
        alert('Failed to send notification!');
      });
    } else {
      alert('Please fill in all fields.');
    }
  }
}
