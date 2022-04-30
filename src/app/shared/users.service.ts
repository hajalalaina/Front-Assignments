import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../login/user.model';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  loggedIn = false;
  constructor(private http:HttpClient) { }
  url = "http://localhost:8010/api/assignments";
  getUser(login:string, password:string): Observable<User | undefined> {
    return this.http.get<User>(`${this.url}/users/${login}/${password}`);
  }

}
