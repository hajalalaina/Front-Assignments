import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
      return false;
    } else {
      //check if token is not expired
      const token = localStorage.getItem('token');
      if (token) {
        const tokenValue: any = jwt_decode(token);
        let expired: boolean = true;
        expired = new Date(tokenValue.exp * 1000) < new Date();

        if (expired) {
          this.router.navigate(['/login']);
          localStorage.removeItem('token');
          return false;
        }
      }
    }
    return true;
  }
}
