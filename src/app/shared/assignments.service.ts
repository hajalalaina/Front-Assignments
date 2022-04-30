import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Assignment } from '../assignments/assignment.model';
import { getToken } from '../utils/token.util';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  assignments: Assignment[] = [];

  constructor(
    private loggingService: LoggingService,
    private http: HttpClient
  ) {
    this.loggingService.setNiveauTrace(2);
  }

  url = environment.api + '/api/assignments';

  getAssignments(page: number, limit: number): Observable<any> {
    // en réalité, bientôt au lieu de renvoyer un tableau codé en dur,
    // on va envoyer une requête à un Web Service sur le cloud, qui mettra un
    // certain temps à répondre. On va donc préparer le terrain en renvoyant
    // non pas directement les données, mais en renvoyant un objet "Observable"
    //return of(this.assignments);
    return this.http.get<Assignment[]>(
      this.url + '?page=' + page + '&limit=' + limit,
      {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + getToken() }),
      }
    );
  }

  getAssignment(id: number): Observable<Assignment[] | null> {
    //let a = this.assignments.find(a => a.id === id);
    //return of(a);
    return this.http
      .get<Assignment[]>(`${this.url}/${id}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + getToken() }),
      })
      .pipe(catchError(this.handleError<any>(id)));
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(JSON.stringify(error.error.error) + ' ' + operation);

      return of(result as T);
    };
  }

  addAssignment(assignment: Assignment): Observable<any> {
    // this.assignments.push(assignment);

    this.loggingService.log(assignment.libelle, 'ajouté');

    return this.http.post<Assignment>(this.url, assignment, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + getToken() }),
    });

    //return of("Assignment ajouté");
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    this.loggingService.log(assignment.libelle, 'modifié');

    return this.http.put<Assignment>(this.url, assignment, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + getToken() }),
    });
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    //let pos = this.assignments.indexOf(assignment);
    //this.assignments.splice(pos, 1);

    this.loggingService.log(assignment.libelle, 'supprimé');

    //return of("Assignment supprimé");
    return this.http.delete(this.url + '/' + assignment._id, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + getToken() }),
    });
  }
}
