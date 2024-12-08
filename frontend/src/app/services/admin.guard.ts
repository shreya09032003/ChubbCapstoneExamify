import { Injectable, inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
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
    if (this.login.isLoggedIn() && this.login.getUserRole() === 'ADMIN') {
      return true; // Allow Admin access
    }

    this.router.navigate(['login']);
    return false; // Deny access to Admin routes if not logged in or not Admin
  };
}
