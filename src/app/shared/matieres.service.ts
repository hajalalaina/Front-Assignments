import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Matiere } from '../assignments/matiere.model';
import { getToken } from '../utils/token.util';

@Injectable({
  providedIn: 'root',
})
export class MatieresService {
  urlApi = environment.api + '/api/matieres';

  constructor(private http: HttpClient) {}

  getMatieres(): Observable<any> {
    return this.http.get<Matiere[]>(this.urlApi, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + getToken() }),
    });
  }
}
