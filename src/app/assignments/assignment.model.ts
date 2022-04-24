export class Assignment {
  _id?:string;
  id!: number;
  idAuteur!: number;
  idMatiere!: number;
  libelle!: string;
  dateRendu!: Date;
  note!: number;
  rq!: string;
  rendu!: Boolean;
  matiere!:[];
  auteur!:[];
  prof!:[];
}
