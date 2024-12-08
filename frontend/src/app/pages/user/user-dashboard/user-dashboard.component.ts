import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-user-dashboard',
  imports: [RouterOutlet,SidebarComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
