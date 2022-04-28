import {Matiere} from './matiere.model';
import { User } from '../login/user.model';
export class Assignment {
  _id?:string;
  id!: number;
  idAuteur!: number;
  idMatiere!: number;
  libelle!: string;
  dateRendu!: Date;
  note!: number | undefined;
  rq!: string | undefined;
  rendu!: Boolean | undefined;
  matiere:Matiere[]= [new Matiere()];
  auteur:User[]= [new User()];
  prof:User[] = [new User()];
}
