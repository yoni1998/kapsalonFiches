import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Fiche } from '../types';
@Injectable({
  providedIn: 'root',
})
export class FichesService {
  private dbPath = '/fiches';
  dbRef: AngularFirestoreCollection<Fiche>;

  constructor(db: AngularFirestore) {
    this.dbRef = db.collection(this.dbPath);
  }

  // get all fiches
  getAllFiches(): AngularFirestoreCollection<Fiche> {
    return this.dbRef;
  }
}
