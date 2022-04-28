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
export class AuthGuard implements CanActivate {
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
      //check if token not expired
      const token = localStorage.getItem('token');
      if (token) {
        const tokenValue: any = jwt_decode(token);
        console.log("token", tokenValue);
        let expired: boolean = true;
        expired = new Date(tokenValue.exp * 1000) < new Date();
        console.log(
          'expired?',
          expired,
          ' at ',
          new Date(tokenValue.exp * 1000)
        );
        if (expired) {
          this.router.navigate(['/login']);
          localStorage.removeItem('token');
          return false;
        }
      }
    }
    return true;

    // si renvoie true ça dit que les routes associées à ce gardien sont navigables
    return this.authService.isAdmin().then((admin): boolean => {
      //console.log("admin = " + admin + " type : " + (typeof admin))
      if (admin) {
        console.log('GARDIEN autorise la navigation, vous êtes bien un admin');
        return true;
      } else {
        // si pas admin on force la navigation vers la page d'accueil
        console.log(
          "GARDIEN n'autorise pas la navigation, vous n'êtes pas admin"
        );
        this.router.navigate(['/home']);
        return false;
      }
    });
  }
}
