import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from './login.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService = inject(LoginService); // Use inject for DI
  const token = loginService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(req);
};
