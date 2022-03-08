import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  boutonInactif = true;
  // Champ de formulaire
  nomAssignment!:string;
  dateDeRendu!:Date;

  assignments:Assignment[] = [
    {
      nom: 'Devoir angular de Mr Buffa',
      dateDeRendu: new Date("2022-03-28"),
      rendu:false
    },
    {
      nom: 'Devoir Oracle de Mr Mopolo',
      dateDeRendu: new Date("2022-01-22"),
      rendu:true
    },
    {
      nom: 'Devoir Grails de Mr Galli',
      dateDeRendu: new Date("2022-04-01"),
      rendu:false
    },
];

  constructor() {
    setTimeout(() => {
      this.boutonInactif = false;
    }, 3000 )
  }

  // appelé après le constructeur et AVANT l'affichage du composant
  ngOnInit(): void {}

  onSubmit() {
    console.log("nom = " + this.nomAssignment + " date de rendu = " + this.dateDeRendu);

    let newAssignment = new Assignment();
    newAssignment.nom = this.nomAssignment;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;

    // on l'ajoute au tableau
    this.assignments.push(newAssignment);
  }
}
