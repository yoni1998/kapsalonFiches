import { Formules } from './formules';

export interface Fiche {
  id?: any;
  naam: string;
  telefoonNummer: number;
  mobielNummer: number;
  zakelijkNummer?: number;
  adres: string;
  formules?: Formules[];
  orderField?: any;
  createdAt?: Date;
}
