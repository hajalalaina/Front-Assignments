import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Assignment } from '../assignments/assignment.model';
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

  // url = 'http://localhost:8010/api/assignments';
  url = environment.api + '/api/assignments';

  getAssignments(page: number, limit: number): Observable<any> {
    // en réalité, bientôt au lieu de renvoyer un tableau codé en dur,
    // on va envoyer une requête à un Web Service sur le cloud, qui mettra un
    // certain temps à répondre. On va donc préparer le terrain en renvoyant
    // non pas directement les données, mais en renvoyant un objet "Observable"
    //return of(this.assignments);
    return this.http.get<Assignment[]>(
      this.url + '?page=' + page + '&limit=' + limit
    );
  }

  getAssignment(id: number): Observable<Assignment[] | null> {
    //let a = this.assignments.find(a => a.id === id);
    //return of(a);
    return this.http
      .get<Assignment[]>(`${this.url}/${id}`)
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

    return this.http.post<Assignment>(this.url, assignment);

    //return of("Assignment ajouté");
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    this.loggingService.log(assignment.libelle, 'modifié');

    return this.http.put<Assignment>(this.url, assignment);
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    //let pos = this.assignments.indexOf(assignment);
    //this.assignments.splice(pos, 1);

    this.loggingService.log(assignment.libelle, 'supprimé');

    //return of("Assignment supprimé");
    return this.http.delete(this.url + '/' + assignment._id);
  }

  // peuplerBD() {
  //   bdInitialAssignments.forEach(a => {
  //     let newAssignment = new Assignment();
  //     newAssignment.libelle = a.libelle;
  //     newAssignment.dateDeRendu = new Date(a.dateDeRendu);
  //     newAssignment.rendu = a.rendu;
  //     newAssignment.id = a.id;

  //     this.addAssignment(newAssignment)
  //     .subscribe(reponse => {
  //       console.log(reponse.message);
  //     })
  //   })
  // }

  // peuplerBDAvecForkJoin(): Observable<any> {
  //   const appelsVersAddAssignment:any = [];

  //   bdInitialAssignments.forEach((a) => {
  //     const nouvelAssignment:any = new Assignment();

  //     nouvelAssignment.id = a.id;
  //     nouvelAssignment.libelle = a.libelle;
  //     nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
  //     nouvelAssignment.rendu = a.rendu;

  //     appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
  //   });
  //   return forkJoin(appelsVersAddAssignment); // renvoie un seul Observable pour dire que c'est fini
  // }
}
