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

  constructor(
    private filterService: FilterService,
    private ficheService: FichesService
  ) {
    this.getFiches();
  }

  getFiches(): void {
    this.ficheService
      .getAllFiches()
      .pipe(takeUntil(this.destroy$$))
      .subscribe((fiches) => {
        this.fichesList = fiches;
      });
  }
}
