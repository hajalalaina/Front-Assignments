import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  nom: string = '';
  mdp: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log('infos user', this.nom, this.mdp);
    this.authService.logIn(this.nom, this.mdp).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    //TODO: token ?
  }
}
