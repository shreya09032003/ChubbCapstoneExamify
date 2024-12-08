import { Injectable, inject, signal } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class TeacherGuard {
  private login = inject(LoginService); // Injecting LoginService
  private router = inject(Router); // Injecting Router

  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree => {
    if ( this.login.isLoggedIn() && this.login.getUserRole() === 'TEACHER' ) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  };
}
