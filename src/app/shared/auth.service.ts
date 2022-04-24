import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../login/user.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = false;
  url = 'http://localhost:8010/api/users';
  //POST  nom: mdp:
  //body = {nom:input,mdp:input}
  constructor(private http: HttpClient) {}

  logIn(login: string , password: string) {
    // normalement il faudrait envoyer une requête sur un web service, passer le login et le password
    // et recevoir un token d'authentification, etc. etc.

    // pour le moment, si on appelle cette méthode, on ne vérifie rien et on se loggue
    const body = {
      nom: login,
      mdp: password,
    };

    return this.http.post<User>(this.url, body);

    // this.loggedIn = true;
  }

  logOut() {
    this.loggedIn = false;
  }

  isAdmin() {
    let isUserAdmin = new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });
    //return this.loggedIn;
    return isUserAdmin;
  }

  // isAdmin().then(admin => { if(admin) { console.log("L'utilisateur est administrateur"); }})
}
