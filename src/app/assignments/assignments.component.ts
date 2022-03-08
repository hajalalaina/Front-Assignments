import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
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

  assignments:Assignment[] = [];


  constructor(private assignmentsService:AssignmentsService) {}

  // appelé après le constructeur et AVANT l'affichage du composant
  ngOnInit(): void {
    console.log("Dans ngOnInit, appelé avant l'affichage")
    // demander les données au service de gestion des assignments...
    this.assignmentsService.getAssignments()
    .subscribe(assignments => {
      console.log("données arrivées");
      this.assignments = assignments;
    });

    console.log("Après l'appel au service");
  }


  assignmentClique(assignment:Assignment) {
    this.assignmentSelectionne = assignment;
  }

  onAddAssignmentBtnClick() {
    this.formVisible = true;
  }

  onNouvelAssignment(event:Assignment) {
    console.log("Evenement en provenance du fils arrivé");
    //this.assignments.push(event);

    this.assignmentsService.addAssignment(event)
    .subscribe(message => {
      console.log(message);

      // je ne peux afficher la liste que quand l'ajout a réellement été fait
      this.formVisible = false;
    })
  }

  onDeleteAssignment(event:Assignment) {
    this.assignmentsService.deleteAssignment(event)
    .subscribe(message => {
      console.log(message);
    })
  }
}
