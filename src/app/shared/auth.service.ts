import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../login/user.model';
import jwt_decode from 'jwt-decode';
import {  Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = false;
  url = environment.api;
  // url = 'http://localhost:8010/api/users/login';
  token: string = '';

  constructor(private http: HttpClient) {}

  logIn(login: string, password: string):Observable<User>  {
    const body = {
      nom: login,
      mdp: password,
    };
    const callApi = this.http.post<User>(this.url, body);
    return callApi;
  }

  logOut() {
    localStorage.removeItem('token');
  }

  isAdmin() {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenValue: any = jwt_decode(token);
      if (tokenValue.user.role == 1) {
        console.log('guard auth', tokenValue.user);
        return true;
      }
    }
    return false;
  }
}
