import { Component, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { AssignmentsService } from '../shared/assignments.service';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  assignments: Assignment[] = [];
  assignmentsRendu: Assignment[] = [];
  assignmentsNonRendu: Assignment[] = [];
  // pagination
  page = 1;
  limit = 10;
  totalPages = 0;
  pagingCounter = 0;
  hasPrevPage = false;
  hasNextPage = true;
  prevPage = 1;
  nextPage = 2;
  totalDocs = 0;
  isShow: boolean = false;

  constructor(
    private assignmentsService: AssignmentsService,
    private ngZone: NgZone,
    public dialog: MatDialog
  ) {}

  openModal(id: number) {
    const dialogRef = this.dialog.open(AssignmentDetailComponent, {
      data: { id: id },
    });
  }
  testDark() {
    //TODO: dark mode
    document.documentElement.classList.add('dark');
  }
  removeDark() {
    document.documentElement.classList.remove('dark');
  }
  // appelé après le constructeur et AVANT l'affichage du composant
  ngOnInit(): void {
    console.log("Dans ngOnInit, appelé avant l'affichage");
    this.getAssignments();
  }
  sortAssignments(assignments: Assignment[]) {
    this.assignmentsRendu = assignments.filter((a) => a.rendu == true);
    this.assignmentsNonRendu = assignments.filter((a) => a.rendu == false);
  }
  getAssignments() {
    // demander les données au service de gestion des assignments...
    this.assignmentsService
      .getAssignments(this.page, this.limit)
      .subscribe((reponse) => {
        console.log('données arrivées');
        this.assignments = reponse.docs;
        this.sortAssignments(this.assignments);
        this.page = reponse.page;
        this.limit = reponse.limit;
        this.totalPages = reponse.totalPages;
        this.pagingCounter = reponse.pagingCounter;
        this.hasPrevPage = reponse.hasPrevPage;
        this.hasNextPage = reponse.hasNextPage;
        this.prevPage = reponse.prevPage;
        this.nextPage = reponse.nextPage;
        this.totalDocs = reponse.totalDocs;
      });

    console.log("Après l'appel au service");
  }
  onPageEvent(event: PageEvent) {
    console.log(event);
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getAssignments();
  }

  pagePrecedente() {
    this.page--;
    this.getAssignments();
  }

  pageSuivante() {
    this.page++;
    this.getAssignments();
  }

  premierePage() {
    this.page = 1;
    this.getAssignments();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignments();
  }
}
