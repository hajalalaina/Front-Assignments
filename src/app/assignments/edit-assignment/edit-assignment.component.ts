import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { MatieresService } from 'src/app/shared/matieres.service';

import { Assignment } from '../assignment.model';
import { Matiere } from '../matiere.model';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  @ViewChild('rendu') renderElement!: MatCheckbox;

  assignment!: Assignment | null;
  nomAssignment!: string;
  dateDeRendu!: Date;
  note: number | undefined;
  matieres: Matiere[] = [];
  matiereSelected: number = 0;
  remarque : string = "";
  erreur: string = "";
  constructor(
    private assignmentsService: AssignmentsService,
    private matieresService: MatieresService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  ngOnInit(): void {
    // ici un exemple de récupération des query params et du fragment
    let queryParams = this.route.snapshot.queryParams;
    console.log("Query params :")
    console.log(queryParams);
    console.log("Fragment :")
    console.log(this.route.snapshot.fragment);

    this.getAssignment();
  }

  getAssignment() {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force l'id de type string en "number"
    this.matieresService.getMatieres().subscribe((list: Matiere[]) => {
      this.matieres = list;
    });
    const id = +this.route.snapshot.params['id'];

    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      if (!assignment) return;
      if(assignment){
        this.assignment = assignment[0];
        this.nomAssignment = this.assignment.libelle;
        this.dateDeRendu = this.assignment.dateRendu;
        this.note = this.assignment.note;
        this.matiereSelected = this.assignment.idMatiere;
        this.remarque = this.assignment.rq;
      }
    });

  }
  rendered() {
    if (!this.assignment) return;
    console.log("note : " + this.note);

    if(this.note || this.note == 0) {
      this.renderElement.checked = true;
      this.assignment.rendu = true;
      this.erreur = "";
    }
    else{
      this.assignment.rendu = false;
    }
  }
  onRenderChecked(event: any) {
    if (!this.assignment) return;
    if(event.checked) {
      if(this.note == null){
        this.erreur = "Veuillez entrer une note";
        this.renderElement.checked = false;
      }
      else{
        this.assignment.rendu = true;
      }
    }
    else{
      if(this.note || this.note == 0) {
        this.assignment.rendu = false;
        this.note = undefined;
      }
    }
  }
  onSaveAssignment() {
    if (!this.assignment) return;

    // on récupère les valeurs dans le formulaire
    this.assignment.libelle = this.nomAssignment;
    this.assignment.dateRendu = this.dateDeRendu;
    this.assignment.rq = this.remarque;
    this.assignment.idMatiere = this.matiereSelected;
    if(this.note) this.assignment.note = this.note;

    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((reponse) => {
        console.log(reponse.message);

        // navigation vers la home page
        this.router.navigate(['/home']);
      });
  }
}
