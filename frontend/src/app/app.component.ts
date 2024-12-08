import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import {NgxUiLoaderModule} from 'ngx-ui-loader';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent,NgxUiLoaderModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'online-exam-system-frontend';
}
