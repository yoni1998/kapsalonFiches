import { ExportExcelService } from './../../services/export-excel.service';
import { FichesService } from '../../services/fiches.service';
import { Component, OnInit } from '@angular/core';
import { Fiche, Formules } from '../../types';
import { map, takeUntil } from 'rxjs/operators';
import { Form } from '../../shared/form';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import alasql from 'alasql';
@Component({
  selector: 'app-fiches',
  templateUrl: './fiches.component.html',
  styleUrls: ['./fiches.component.scss'],
})
export class FichesComponent extends Form implements OnInit {
  fichesList: Fiche[] = [];
  formuleList: Formules[] = [];
  selectedFiche: Fiche | undefined;
  items: any;

  constructor(
    protected override ficheService: FichesService,
    protected override route: ActivatedRoute,
    protected override confirmationService: ConfirmationService,
    protected override router: Router,
    protected override fb: FormBuilder,
    protected override activeRoute: ActivatedRoute,
    protected override toast: ToastrService,
    private exportExcelService: ExportExcelService
  ) {
    super(
      ficheService,
      route,
      confirmationService,
      router,
      fb,
      activeRoute,
      toast
    );

    this.items = [
      {
        label: 'Export Fiches',
        icon: 'pi pi-download',
        command: () => {
          this.exportFichesToExcel();
        },
      },
      {
        label: 'Export Formules',
        icon: 'pi pi-download',
        command: () => {
          this.exportFormulesToExcel();
        },
      },
    ];
  }
  sortFields = [
    { orderField: 'achternaam', value: 'Achternaam' },
    { orderField: 'voornaam', value: 'Voornaam' },
    { orderField: 'adres', value: 'Adres' },
    { orderField: 'createdAt', value: 'Aangemaakt op' },
  ];

  ngOnInit(): void {
    this.getFiches();
  }

  exportExcel(): void {
    this.exportFichesToExcel();
    this.exportFormulesToExcel();
  }

  exportFichesToExcel(): void {
    var res = alasql(
      `SEARCH / AS @data \ RETURN(voornaam as Voornaam, achternaam as Achternaam, adres as Adres, telefoonNummer as TelefoonNummer, mobielNummer as MobielNummer, zakelijkNummer as ZakelijkNummer, createdAt.seconds as CreatedAt) \ FROM ?`,
      [this.fichesList]
    );
    this.exportExcelService.exportAsExcelFile(res, 'fichesList');
  }

  exportFormulesToExcel(): void {
    var res = alasql(
      `SEARCH / AS @data \ RETURN(formuleText as Formule, id as Id, prijs as Prijs, opmerking as Opmerking, ficheId as FicheID, createdAt.seconds as CreatedAt, updatedAt as UpdatedAt) \ FROM ?`,
      [this.formuleList]
    );
    this.exportExcelService.exportAsExcelFile(res, 'formuleList');
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

  // get all formules on ficheIds for export
  getFormules(fiches: any): void {
    for (let fiche of fiches) {
      this.ficheService
        .getAllFormulesOnFicheId(fiche.id)
        .snapshotChanges()
        .pipe(
          map((x) =>
            x.map((changes) => ({
              ...changes.payload.doc.data(),
            }))
          ),
          takeUntil(this.destroy$$)
        )
        .subscribe((data) => {
          this.formuleList = data;
        });
    }
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
        this.getFormules(data);
      });
  }
}
