import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  boutonInactif = true;

  assignments = [
    {
      nom: 'Devoir angular de Mr Buffa',
      dateDeRendu: "2022-03-28",
      rendu:false
    },
    {
      nom: 'Devoir Oracle de Mr Mopolo',
      dateDeRendu: "2022-01-22",
      rendu:true
    },
    {
      nom: 'Devoir Grails de Mr Galli',
      dateDeRendu: "2022-04-01",
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
    console.log("Formulaire soumis");
  }
}
