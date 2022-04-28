import {Matiere} from './matiere.model';
import { User } from '../login/user.model';
export class Assignment {
  _id?:string;
  id!: number;
  idAuteur!: number;
  idMatiere!: number;
  libelle!: string;
  dateRendu!: Date;
  note!: number;
  rq!: string;
  rendu!: boolean;
  matiere:Matiere[]= [new Matiere()];
  auteur:User[]= [new User()];
  prof:User[] = [new User()];
}
