import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Matiere } from '../assignments/matiere.model';

@Injectable({
  providedIn: 'root',
})
export class MatieresService {
  urlApi = 'http://localhost:8010/api/matieres';
  //TODO: url => env.local ?

  constructor(private http: HttpClient) {}

  getMatieres(): Observable<any> {
    return this.http.get<Matiere[]>(this.urlApi);
  }
}
