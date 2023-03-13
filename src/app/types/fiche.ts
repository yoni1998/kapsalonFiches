import { Formules } from './formules';

export interface Fiche {
  voornaam: string;
  achternaam: string;
  telefoonNummer: number;
  mobielNummer: number;
  adres: string;
  formules?: Formules[];
  orderField?: any;
}
