import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../login/user.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = false;
  url = 'http://localhost:8010/api/users/login';
  token: string = '';

  constructor(private http: HttpClient) {}

  logIn(login: string, password: string) {
    const body = {
      nom: login,
      mdp: password,
    };
    const callApi = this.http.post<User>(this.url, body);
    callApi.subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
      },
      (err) => {
        console.log('err', err);
      }
    );
    return callApi;
  }

  logOut() {
    localStorage.removeItem('token');
  }

  isAdmin() {
    //transformer token => droit
    let isUserAdmin = new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });
    //return this.loggedIn;
    return isUserAdmin;
  }

  // isAdmin().then(admin => { if(admin) { console.log("L'utilisateur est administrateur"); }})
}
