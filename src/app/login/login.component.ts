import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  nom: string = '';
  mdp: string = '';
  erreur: string = '';
  constructor(private authService: AuthService,private router: Router ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.authService.logIn(this.nom, this.mdp).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      },
      (err) => {
        this.erreur = JSON.stringify(err.error);
      }
    );;
  }
  logout() {
    this.authService.logOut();
  }
}
