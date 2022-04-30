import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Matiere } from '../assignments/matiere.model';

@Injectable({
  providedIn: 'root',
})
export class MatieresService {
  // urlApi = 'http://localhost:8010/api/matieres';
  urlApi = environment.api + '/api/matieres';

  constructor(private http: HttpClient) {}

  getMatieres(): Observable<any> {
    return this.http.get<Matiere[]>(this.urlApi);
  }
}
