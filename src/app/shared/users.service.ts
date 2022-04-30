import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { User } from '../login/user.model';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  loggedIn = false;
  constructor(private http: HttpClient) {}
  url = environment.api + '/api/assignments';
  getUser(login: string, password: string): Observable<User | undefined> {
    return this.http.get<User>(`${this.url}/users/${login}/${password}`);
  }
}
