import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentSnapshot,
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

  // get fiche on id
  getFicheById(id: string) {
    return this.dbRef.doc(id).ref.get();
  }

  // create fiches
  createNewFiche(fiche: Fiche): any {
    return this.dbRef.add({ ...fiche });
  }

  // update fiche
  updateFiche(id: string, fiche: Fiche): Promise<void> {
    return this.dbRef.doc(id).set(fiche);
  }

  // delete fiche
  deleteFiche(id: string): Promise<void> {
    return this.dbRef.doc(id).delete();
  }
}
