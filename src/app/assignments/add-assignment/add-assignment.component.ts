import { Component, OnInit } from '@angular/core';
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

  nomAssignment!: string;
  dateDeRendu!: Date;
  idMatiere!: number;
  remarque: string = "";
  rendu: boolean = false;
  note!: number;

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private matieresService: MatieresService
  ) {}

  ngOnInit(): void {
    this.matieresService.getMatieres().subscribe((list: Matiere[]) => {
      this.matieres = list;
    });
  }

  onSubmit() {
    if (!this.nomAssignment || !this.dateDeRendu || !this.idMatiere) return;

    console.log('CREATE new assignment, affichage des données ');
    console.log('nomAssignment', this.nomAssignment);
    console.log('dateDeRendu', this.dateDeRendu);
    console.log('matiere', this.idMatiere);
    console.log('remarque', this.remarque);
    console.log('rendu', this.rendu);
    console.log('note', this.note);
    const currentUser = getUserViaToken();
    let newAssignment = new Assignment();
    newAssignment.id = Math.round(Math.random() * 10000000);
    newAssignment.idAuteur = currentUser.idUser;
    newAssignment.idMatiere = this.idMatiere;
    newAssignment.libelle = this.nomAssignment;
    newAssignment.dateRendu = this.dateDeRendu; //NEED FORMATTER?
    newAssignment.note = this.note;
    newAssignment.rq = this.remarque ?? '';
    newAssignment.rendu = this.rendu;
    console.log('assignment object', newAssignment);
    console.log('END CREATE new assignment');

    this.assignmentsService
      .addAssignment(newAssignment)
      .subscribe((reponse) => {
        console.log(reponse.message);

        // il va falloir naviguer (demander au router) d'afficher à nouveau la liste
        // en gros, demander de naviguer vers /home
        this.router.navigate(['/home']);
      });
  }
}
