import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, tap } from 'rxjs';
import { Fiche } from '../types';
@Injectable({
  providedIn: 'root',
})
export class FichesService {
  constructor(private db: AngularFirestore) {}

  // add new fiche
  /* addFiche(fiche: Fiche) {
    fiche.id = parseInt(this.db.createId());
    return this.db.collection('/fiches').add(fiche);
  }*/

  // get all fiches
  getAllFiches(): Observable<Fiche[]> {
    return this.db
      .collection<Fiche>('fiches', (ref) => ref.orderBy('achternaam'))
      .snapshotChanges()
      .pipe(
        map((data: any[]) =>
          data.map(
            (values) =>
              values.payload._delegate.doc._document.data.value.mapValue.fields
          )
        )
      );
  }

  // delete fiche
  /* deleteFiche(fiche: Fiche) {
    return this.db.doc('/fiches/' + fiche.id).delete();
  }*/

  // update fiche
}
