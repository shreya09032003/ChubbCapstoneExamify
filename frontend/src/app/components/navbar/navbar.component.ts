import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginService } from '../../services/login.service';
// import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true, // Standalone Component
  imports: [
    MatIconModule, 
    MatToolbarModule,  
    FormsModule, 
    NgIf, 
    RouterModule, 
    RouterLink, 
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Fixed typo from `styleUrl` to `styleUrls`
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user: any = null;

  constructor(public login: LoginService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe(() => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    });
  }

  public logout() {
    this.login.logout();
    window.location.reload();
  }
}
