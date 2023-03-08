import { FichesService } from './../services/fiches.service';
import { Component, OnInit } from '@angular/core';
import { FilterService } from 'primeng/api';
import { Fiche } from '../types';
import { map, tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-fiches',
  templateUrl: './fiches.component.html',
  styleUrls: ['./fiches.component.scss'],
})
export class FichesComponent {
  destroy$$ = new Subject();
  fichesList: Fiche[] = [];
  selectedFiche: Fiche | undefined;
  // loading spinner
  showSpinner: boolean = true;

  constructor(
    private filterService: FilterService,
    private ficheService: FichesService
  ) {
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
