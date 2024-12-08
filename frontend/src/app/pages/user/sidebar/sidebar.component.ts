import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../../services/category.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatCard } from '@angular/material/card';
import { MatActionList } from '@angular/material/list';
import { NgFor, NgForOf } from '@angular/common';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink,MatIcon,MatCard,MatActionList,NgFor,NgForOf,RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  categories: any;
  constructor(private _cat: CategoryService, private _snack: MatSnackBar, private loginService: LoginService) {}
  userId: number | null = null;


  ngOnInit(): void {
    const user = this.loginService.getUser(); // Retrieve the user from the login service
    this.userId = user.id;
    console.log(this.userId);
    this._cat.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error: any) => {
        this._snack.open('Error in loading categories from server', '', {
          duration: 3000,
        });
      }
    );
  }
}
