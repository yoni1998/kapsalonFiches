import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { Formules } from '../shared/types';

@Injectable({
  providedIn: 'root',
})
export class FormulesService {
  constructor(private db: AngularFirestore) {}

  // get all formules on ficheId
  getAllFormulesOnFicheId(id: string): AngularFirestoreCollection<Formules> {
    return this.db.collection('/fiches/' + id + '/formules', (ref) =>
      ref.orderBy('createdAt', 'desc')
    );
  }

  // get formule on id
  getFormuleByFicheId(id: string, ficheId: string) {
    return this.db
      .collection('/fiches/' + ficheId + '/formules')
      .doc(id)
      .snapshotChanges();
  }

  // remove formule on id
  removeFormules(
    id: string | undefined,
    ficheId: string | null
  ): Promise<void> {
    return this.db
      .collection('/fiches/' + ficheId + '/formules')
      .doc(id)
      .delete();
  }

  // create new formule
  // if ficheId is null, then recentCreatedFicheId will be used and vice versa
  createNewFormule(
    formule: Formules,
    ficheId?: string,
    recentCreatedFicheId?: string
  ): any {
    if (ficheId) {
      return this.db
        .collection('/fiches/' + ficheId + '/formules')
        .add({ ...formule });
    }
    if (recentCreatedFicheId) {
      return this.db
        .collection('/fiches/' + recentCreatedFicheId + '/formules')
        .add({ ...formule });
    }
  }

  // update formule
  updateFormule(
    id: string,
    formule: Formules | undefined,
    ficheId: string
  ): Promise<void> {
    return this.db
      .collection('/fiches/' + ficheId + '/formules')
      .doc(id)
      .set(formule);
  }
}
