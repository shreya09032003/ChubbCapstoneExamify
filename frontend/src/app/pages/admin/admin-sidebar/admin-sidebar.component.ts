import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatActionList } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  imports: [MatIcon,MatCard,MatActionList,RouterLink,RouterLinkActive],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {

}
