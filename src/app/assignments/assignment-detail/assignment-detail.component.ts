import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Assignment } from '../assignment.model';

export interface DialogData {
  id: number;
}
@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis?: Assignment | null;
  erreurDetail?: '';
  constructor(
    private assignmentsService: AssignmentsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<AssignmentDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    // on va récupérer l'id dans l'URL,
    // le + permet de forcer en number (au lieu de string)
    // const id = +this.route.snapshot.params['id'];
    this.getAssignment(this.data.id);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getAssignment(id: number) {
    // on demande au service de gestion des assignment,
    // l'assignment qui a cet id !
    this.assignmentsService.getAssignment(id).subscribe(
      (assignment) => {
        this.assignmentTransmis = assignment ? assignment[0] : null;
      },
      (error) => {
        this.router.navigate(['/home']);
      }
    );
  }

  onDelete() {
    if (!this.assignmentTransmis) return;

    this.assignmentsService
      .deleteAssignment(this.assignmentTransmis)
      .subscribe((reponse) => {
        console.log(reponse.message);
        // et on navigue vers la page d'accueil pour afficher la liste
        this.router.navigate(['/home']);
      });
  }
  onClickEdit() {
    this.router.navigate(['/assignment', this.assignmentTransmis?.id, 'edit']);
  }

  isLoggedIn() {
    console.log('isAdmin : ' + this.authService.isAdmin());
    return this.authService.isAdmin();
  }
}
