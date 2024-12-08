import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCard } from '@angular/material/card';
import { MatFormField, matFormFieldAnimations, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatHint } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [MatCard,MatFormField,MatIcon,MatLabel,FormsModule,MatHint,MatFormFieldModule,MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
  };
  hide = true;

  constructor(
    private snack: MatSnackBar,
    private login: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  resetForm() {
    this.loginData.username = '';
    this.loginData.password = '';
  }
  

  formSubmit() {
    console.log('login btn clicked');

    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username == null
    ) {
      this.snack.open('Username is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password == null
    ) {
      this.snack.open('Password is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('success');
        console.log(data);

        //login...
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe((user: any) => {
          this.login.setUser(user);
          console.log(user);
          console.log(this.login.getUserRole());
          
          //redirect ...ADMIN: admin-dashboard
          //redirect ...NORMAL:normal-dashboard
          if (this.login.getUserRole() == 'TEACHER') {
          
            // window.location.href = '/teacher/' + user.id;
            this.router.navigate([`teacher/${user.id}`]);
            // this.router.navigate(['teacher']);
            this.login.loginStatusSubject.next(true);
          } else if (this.login.getUserRole() == 'NORMAL') {
            //normal user dashbaord
            // window.location.href = '/user-dashboard';
            this.router.navigate([`user-dashboard/${user.id}`]);
            this.login.loginStatusSubject.next(true);
          } else if(this.login.getUserRole() == 'ADMIN'){
            this.router.navigate(['admin']);
            this.login.loginStatusSubject.next(true);
          } 
          
          else {
            this.login.logout();
          }
        });
      },
      (error) => {
        console.log('Error !');
        console.log(error);
        this.snack.open('Invalid Details !! Try again', '', {
          duration: 3000,
        });
      }
    );
  }
}
