import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  boutonInactif = true;
  assignmentSelectionne?: Assignment;
  formVisible = false;


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
    /*
    setTimeout(() => {
      if(this.assignmentSelectionne)
        this.assignmentSelectionne.nom = "CHANGE !!!!!!!!";
    }, 5000 )
    */
  }

  // appelé après le constructeur et AVANT l'affichage du composant
  ngOnInit(): void {}


  assignmentClique(assignment:Assignment) {
    this.assignmentSelectionne = assignment;
  }

  onAddAssignmentBtnClick() {
    this.formVisible = true;
  }

  onNouvelAssignment(event:Assignment) {
    console.log("Evenement en provenance du fils arrivé");
    this.assignments.push(event);

    this.formVisible = false;
  }
}
