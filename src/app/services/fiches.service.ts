import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Fiche, Formules } from '../types';
@Injectable({
  providedIn: 'root',
})
export class FichesService {
  ficheId: string | undefined;
  private dbPath = '/fiches';
  dbRef: AngularFirestoreCollection<Fiche>;

  constructor(private db: AngularFirestore) {
    this.dbRef = db.collection(this.dbPath);
  }

  // fiches

  // get all fiches
  getAllFiches(): AngularFirestoreCollection<Fiche> {
    return this.db.collection(this.dbPath, (ref) => ref.orderBy('achternaam'));
  }

  // get fiche on id
  getKlantDetailsById(id: string) {
    this.ficheId = id;
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

  // formules

  // get all formules on ficheId
  getAllFormulesOnFicheId(id: string): AngularFirestoreCollection<Formules> {
    return this.db.collection('/fiches/' + id + '/formules', (ref) =>
      ref.orderBy('createdAt')
    );
  }

  // get formule on id
  getFormuleByFicheId(id: string) {
    return this.db
      .collection('/fiches/' + this.ficheId + '/formules')
      .doc(id)
      .snapshotChanges();
  }

  // remove formule on id
  removeFormules(id: string | undefined): Promise<void> {
    return this.db
      .collection('/fiches/' + this.ficheId + '/formules')
      .doc(id)
      .delete();
  }

  // create formule from a new created fiche
  createNewFormule(formule: Formules, newFicheId: string): any {
    return this.db
      .collection('/fiches/' + newFicheId + '/formules')
      .add({ ...formule });
  }

  // create formule from existing fiche
  createNewFormuleFromExistingFiche(formule: Formules): any {
    return this.db
      .collection('/fiches/' + this.ficheId + '/formules')
      .add({ ...formule });
  }

  // update formule
  updateFormule(id: string, formule: Formules | undefined): Promise<void> {
    return this.db
      .collection('/fiches/' + this.ficheId + '/formules')
      .doc(id)
      .set(formule);
  }
}
