import { Component,OnInit } from '@angular/core';
import { Router,NavigationStart } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';
import { getUserViaToken } from './utils/token.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  titre = 'Assignments...';
  islogged = false;
  image = '../assets/images/logo.png';
  constructor(
    private router: Router,
    private assignmentsService: AssignmentsService
  ) {
    
  }
 
  ngOnInit(): void {
    // verifie si l'user est logué à chaque changement d'url
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLogged();
        if(event.url === '/login') {
          this.islogged = false;
        }
      }
    });
  }
  isLogged() {
    const token = localStorage.getItem('token');
    if(token) {
      console.log("logged",this.islogged);
      this.image = getUserViaToken().image;
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
