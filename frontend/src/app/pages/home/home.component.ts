import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
// import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  imports: [CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    
  }

  constructor() { }

}
