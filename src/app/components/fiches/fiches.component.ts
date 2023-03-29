import { ExportExcelService } from './../../services/export-excel.service';
import { FichesService } from '../../services/fiches.service';
import { Component, OnInit } from '@angular/core';
import { Fiche, Formules } from '../../shared/types';
import { map, skip, takeUntil } from 'rxjs/operators';
import { Form } from '../../shared/form';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import alasql from 'alasql';
import { FormulesService } from 'src/app/services/formules.service';
@Component({
  selector: 'app-fiches',
  templateUrl: './fiches.component.html',
  styleUrls: ['./fiches.component.scss'],
})
export class FichesComponent extends Form implements OnInit {
  fichesList: Fiche[] = [];
  formuleList: Formules[] = [];
  selectedFiche: Fiche | undefined;

  constructor(
    protected override ficheService: FichesService,
    protected override formulesService: FormulesService,
    protected override route: ActivatedRoute,
    protected override confirmationService: ConfirmationService,
    protected override router: Router,
    protected override fb: FormBuilder,
    protected override activeRoute: ActivatedRoute,
    protected override toast: ToastrService
  ) {
    super(
      ficheService,
      formulesService,
      route,
      confirmationService,
      router,
      fb,
      activeRoute,
      toast
    );
  }
  sortFields = [
    { orderField: 'naam', value: 'Sorteren Op Naam' },
    { orderField: 'createdAt', value: 'Sorteren Op Datum' },
  ];

  ngOnInit(): void {
    this.getFiches();
  }

  filterField(): void {
    this.ficheService
      .getAllFiches(this.selectedFiche?.orderField)
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

  // get all fiches
  getFiches(): void {
    this.ficheService
      .getAllFiches(this.selectedFiche)
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
