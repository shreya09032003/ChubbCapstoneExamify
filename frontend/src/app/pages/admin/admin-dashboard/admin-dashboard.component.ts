import { Component, OnInit } from '@angular/core';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [AdminSidebarComponent,RouterOutlet],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  
  constructor() { }

  ngOnInit(): void {
  }

}


