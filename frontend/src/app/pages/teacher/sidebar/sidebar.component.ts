import { Component, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatActionList } from '@angular/material/list';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-sidebar',
  imports: [MatIcon,MatCard,MatActionList,RouterOutlet,NavbarComponent,RouterLink,RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private loginService: LoginService

  ) { }
  teacherId: number | null = null;

  // fetch the teacher's id from the local storage
  ngOnInit(): void {
    const user = this.loginService.getUser(); // Retrieve the user from the login service
    this.teacherId = user.id;
    console.log(this.teacherId);
    
  }


}
