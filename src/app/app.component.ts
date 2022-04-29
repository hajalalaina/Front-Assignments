import { Component,OnInit } from '@angular/core';
import { Router,NavigationStart } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  titre = 'Assignments...';
  islogged = false;
  constructor(
    private router: Router,
    private assignmentsService: AssignmentsService
  ) {}
 
  ngOnInit(): void {
    this.router.events.subscribe(event =>{
      if (event instanceof NavigationStart){
            this.isLogged();
            if(event.url == '/login'){
              this.islogged = false;
            }
          }
      })
  }
  isLogged() {
    const token = localStorage.getItem('token');
    if(token) {
      this.islogged =  true;
    }
  }

  // genererDonneesDeTest() {
  //   //this.assignmentsService.peuplerBD();
  //   this.assignmentsService.peuplerBDAvecForkJoin().subscribe(() => {
  //     console.log(
  //       'TOUS LES AJOUTS ONT ETE FAITS, ON PEUT RE-AFFICHER LA LISTE'
  //     );
  //     // replaceUrl = true = force le refresh, même si
  //     // on est déjà sur la page d’accueil
  //     // Marche plus avec la dernière version d’angular
  //     this.router.navigate(['/home'], { replaceUrl: true });
  //   });
  // }
}
