import { ExportExcelService } from './../../services/export-excel.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import alasql from 'alasql';
import { map, takeUntil } from 'rxjs';
import { FichesService } from 'src/app/services/fiches.service';
import { FormulesService } from 'src/app/services/formules.service';
import { Fiche, Formules } from 'src/app/shared/types';
import { Form } from 'src/app/shared/form';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.scss'],
})
export class ExcelComponent extends Form implements OnInit {
  items: any;
  fichesList: Fiche[] = [];
  formuleList: Formules[] = [];

  constructor(
    protected override ficheService: FichesService,
    protected override formulesService: FormulesService,
    protected override route: ActivatedRoute,
    protected override confirmationService: ConfirmationService,
    protected override router: Router,
    protected override fb: FormBuilder,
    protected override activeRoute: ActivatedRoute,
    protected override toast: ToastrService,
    private exportExcelService: ExportExcelService,
    private location: Location
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

  ngOnInit(): void {
    this.getFiches();
  }

  exportExcel(): void {
    this.exportFichesToExcel();
    this.exportFormulesToExcel();
  }

  goBack(): void {
    this.location.back();
  }

  // get all fiches
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
        this.getFormules(data);
      });
  }

  // get all formules on ficheIds for export
  getFormules(fiches: any): void {
    for (let fiche of fiches) {
      this.formulesService
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
          if (data.length !== 0) {
            this.formuleList.push(...data);
          }
        });
    }
  }

  exportFichesToExcel(): void {
    var res = alasql(
      `SEARCH / AS @data \ RETURN(naam as Naam, adres as Adres, telefoonNummer as TelefoonNummer, mobielNummer as MobielNummer, zakelijkNummer as ZakelijkNummer, createdAt.seconds as CreatedAt) \ FROM ?`,
      [this.fichesList]
    );
    this.exportExcelService.exportAsExcelFile(res, 'fichesList');
  }

  exportFormulesToExcel(): void {
    var res = alasql(
      `SEARCH / AS @data \ RETURN(formuleText as Formule, id as Id, prijs as Prijs, opmerking as Opmerking, ficheId as FicheID, createdAt.seconds as CreatedAt) \ FROM ?`,
      [this.formuleList]
    );
    this.exportExcelService.exportAsExcelFile(res, 'formuleList');
  }
}
