import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { MatieresService } from 'src/app/shared/matieres.service';
import { getUserViaToken } from '../../utils/token.util';
import { Assignment } from '../assignment.model';
import { Matiere } from '../matiere.model';
@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  // Champ de formulaire
  matieres: Matiere[] = [];
  //stepper
  isLinear = false;
  firstFormGroup: any;
  secondFormGroup: any;
  thirdFormGroup: any;

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private matieresService: MatieresService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.matieresService.getMatieres().subscribe((list: Matiere[]) => {
      this.matieres = list;
    });
    this.firstFormGroup = this._formBuilder.group({
      libelle: ['', Validators.required],
      dateDeRendu: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      idMatiere: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      remarque: [''],
    });
  }

  onSubmit() {
    const libelle = this.firstFormGroup.get('libelle').value;
    const dateDeRendu = this.firstFormGroup.get('dateDeRendu').value;
    const idMatiere = this.secondFormGroup.get('idMatiere').value;
    const remarque = this.thirdFormGroup.get('remarque').value;
    if (!libelle || !dateDeRendu || !idMatiere) return;
    const currentUser = getUserViaToken();
    let newAssignment = new Assignment();
    newAssignment.id = Math.round(Math.random() * 10000000);
    newAssignment.idAuteur = currentUser.idUser;
    newAssignment.idMatiere = idMatiere;
    newAssignment.libelle = libelle;
    newAssignment.dateRendu = dateDeRendu;
    newAssignment.note = 0;
    newAssignment.rq = remarque ?? '';
    newAssignment.rendu = false;
    this.assignmentsService
      .addAssignment(newAssignment)
      .subscribe((reponse) => {
        this.router.navigate(['/home']);
      });
  }
}
