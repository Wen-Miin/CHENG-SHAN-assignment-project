export class Assignment {
  _id?:string;
  id!:number;
  nom!: string; // nom du devoir
  auteur!: string;  // nom de l'étudiant
  matiere!: string; // nom de la matière
  note!: number; // note sur 20
  dateDeRendu!: Date;
  rendu!: boolean; // true si le devoir a été rendu
  remarque!: string; // remarque facultative
  ;

  // TODO : ajouter une propriété image
}
