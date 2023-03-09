import { UnsubscribeBase } from './../shared/unsubscribeBase';
import { FichesService } from './../services/fiches.service';
import { Component } from '@angular/core';
import { FilterService } from 'primeng/api';
import { Fiche } from '../types';
import { map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-fiches',
  templateUrl: './fiches.component.html',
  styleUrls: ['./fiches.component.scss'],
})
export class FichesComponent extends UnsubscribeBase<Fiche> {
  fichesList: Fiche[] = [];
  selectedFiche: Fiche | undefined;
  // loading spinner
  showSpinner: boolean = true;

  constructor(
    private filterService: FilterService,
    private ficheService: FichesService
  ) {
    super();
    this.getFiches();
  }

  getFiches(): void {
    this.ficheService
      .getAllFiches()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        ),
        takeUntil(this.destroy$$)
      )
      .subscribe((data) => {
        this.fichesList = data;
        this.showSpinner = false;
      });
  }
}
