import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { filter, map, pairwise, tap, throttleTime } from 'rxjs';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit{
  assignments:Assignment[] = [];
  assignmentsRendu:Assignment[] = [];
  assignmentsNonRendu:Assignment[] = [];
  // pagination
  page=1;
  limit=10;
  totalPages=0;
  pagingCounter=0;
  hasPrevPage=false;
  hasNextPage=true;
  prevPage= 1;
  nextPage= 2;

  constructor(private assignmentsService:AssignmentsService, private ngZone: NgZone) {}

  // @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;

  // ngAfterViewInit():void{
  //   this.scroller.elementScrolled().pipe(
  //     tap(event => {
  //       //console.log(event);
  //     }),
  //     map(event => {
  //       return this.scroller.measureScrollOffset('bottom');
  //     }),
  //     tap(val => {
  //       //console.log("distance par rapport à la fin = " + val)
  //     }),
  //     pairwise(),
  //     tap(val => {
  //       /*
  //       if(val[0] < val[1]) console.log("on monte")
  //       else console.log("on descend")
  //       */
  //     }),
  //     filter(([y1, y2]) => (y2 < y1 && y2 < 140)),
  //     tap(val => {
  //       //console.log(val)
  //     }),
  //     throttleTime(200),
  //     tap(val => {
  //       //console.log(val);
  //     })
  //   ).subscribe(() => {
  //     // ici traitement final
  //     console.log("On va chercher de nouveaux assignments !")

  //     // on le fait en tache de fond...
  //     this.ngZone.run(() => {
  //       this.page = this.nextPage;
  //       this.getAssignmentsScrollInfini();
  //     })
  //   })
  // }

  // appelé après le constructeur et AVANT l'affichage du composant
  ngOnInit(): void {
    console.log("Dans ngOnInit, appelé avant l'affichage");
    this.getAssignments();
  }
  sortAssignments(assignments:Assignment[]) {
    this.assignmentsRendu = assignments.filter(a => a.rendu == true);
    this.assignmentsNonRendu = assignments.filter(a => a.rendu == false);
  }
  getAssignments() {
      // demander les données au service de gestion des assignments...
      this.assignmentsService.getAssignments(this.page, this.limit)
      .subscribe(reponse => {
        console.log("données arrivées");
        this.assignments = reponse.docs;
        this.sortAssignments(this.assignments);
        this.page = reponse.page;
        this.limit=reponse.limit;
        this.totalPages=reponse.totalPages;
        this.pagingCounter=reponse.pagingCounter;
        this.hasPrevPage=reponse.hasPrevPage;
        this.hasNextPage=reponse.hasNextPage;
        this.prevPage= reponse.prevPage;
        this.nextPage= reponse.nextPage;
      });

      console.log("Après l'appel au service");
  }
  onPageEvent(event:PageEvent) {
    console.log(event);
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getAssignments();
  }
//   getAssignmentsScrollInfini() {
//     // demander les données au service de gestion des assignments...
//     this.assignmentsService.getAssignments(this.page, this.limit)
//     .subscribe(reponse => {
//       console.log("données arrivées");
//       //this.assignments = reponse.docs;
//       // au lieu de remplacer les assignments chargés par les nouveaux, on les ajoute
//       this.assignments = this.assignments.concat(reponse.docs);

//       this.page = reponse.page;
//       this.limit=reponse.limit;
//       this.totalPages=reponse.totalPages;
//       this.pagingCounter=reponse.pagingCounter;
//       this.hasPrevPage=reponse.hasPrevPage;
//       this.hasNextPage=reponse.hasNextPage;
//       this.prevPage= reponse.prevPage;
//       this.nextPage= reponse.nextPage;
//     });

//     console.log("Après l'appel au service");
// }

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
