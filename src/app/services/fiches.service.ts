import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Fiche } from '../shared/types';
@Injectable({
  providedIn: 'root',
})
export class FichesService {
  private dbPath = '/fiches';
  dbRef: AngularFirestoreCollection<Fiche>;

  constructor(private db: AngularFirestore) {
    this.dbRef = db.collection(this.dbPath);
  }

  // get all fiches
  getAllFiches(
    orderField?: any,
    fieldOrder?: any
  ): AngularFirestoreCollection<Fiche> {
    if (!orderField) {
      orderField = 'naam';
    }
    if (orderField === 'naam') {
      fieldOrder = 'asc';
    }
    if (orderField === 'createdAt') {
      fieldOrder = 'desc';
    }
    return this.db.collection(this.dbPath, (ref) =>
      ref.orderBy(String(orderField), fieldOrder)
    );
  }

  // get fiche on id
  getKlantDetailsById(id: string) {
    return this.dbRef.doc(id).snapshotChanges();
  }

  // create fiches
  createNewFiche(fiche: Fiche): any {
    return this.dbRef.add({ ...fiche });
  }

  // update fiche
  updateFiche(id: string | undefined, fiche: Fiche): Promise<void> {
    return this.dbRef.doc(id).set(fiche);
  }

  // delete fiche
  deleteFiche(id: string): Promise<void> {
    return this.dbRef.doc(id).delete();
  }
}
