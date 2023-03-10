import { GenericCrud } from './../shared/generic-crud';
import { FichesService } from './../services/fiches.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fiche, Formules } from '../types';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-add-fiche',
  templateUrl: './add-fiche.component.html',
  styleUrls: ['./add-fiche.component.scss'],
})
export class AddFicheComponent extends GenericCrud<Fiche> implements OnInit {
  formGroupFiches: FormGroup;
  formGroupFormules: FormGroup;
  fiche: Fiche | undefined;
  formule: Formules | undefined;
  ficheId: any;
  newFicheId: any;
  formuleId: any;
  constructor(
    protected override ficheService: FichesService,
    protected override route: ActivatedRoute,
    private location: Location,
    protected override confirmationService: ConfirmationService,
    protected override router: Router,
    protected override fb: FormBuilder,
    protected override activeRoute: ActivatedRoute
  ) {
    super(ficheService, route, confirmationService, router, fb, activeRoute);
    this.formGroupFiches = this.fb.group({
      voornaam: [null, [Validators.required]],
      achternaam: [null, [Validators.required]],
      telefoonNummer: [null],
      mobielNummer: [null, [Validators.required]],
      adres: [null, [Validators.required]],
    });
    this.ficheId = this.activeRoute.snapshot.paramMap.get('id');

    this.formGroupFormules = this.fb.group({
      formuleText: [null],
      prijs: [null],
      createdAt: [null],
      updatedAt: [null],
    });
  }

  toUppercase(name: string): string {
    return name.substring(0, 1).toUpperCase() + name.substring(1);
  }

  ngOnInit(): void {
    if (
      this.ficheId &&
      this.activeRoute.snapshot.routeConfig?.path !== 'fiches/:id/info/edit/:id'
    ) {
      this.ficheService
        .getKlantDetailsById(this.ficheId)
        .pipe(takeUntil(this.destroy$$))
        .subscribe((data) => {
          this.formGroupFiches.patchValue({
            voornaam: data.payload.data()?.voornaam,
            achternaam: data.payload.data()?.achternaam,
            telefoonNummer: data.payload.data()?.telefoonNummer,
            mobielNummer: data.payload.data()?.mobielNummer,
            adres: data.payload.data()?.adres,
          });
        });
    }

    if (
      this.ficheId &&
      this.activeRoute.snapshot.routeConfig?.path === 'fiches/:id/info/edit/:id'
    ) {
      this.ficheService
        .getFormuleByFicheId(this.ficheId)
        .pipe(takeUntil(this.destroy$$))
        .subscribe((values: any) => {
          this.formGroupFormules.patchValue({
            formuleText: values.payload.data()?.formuleText,
            prijs: values.payload.data()?.prijs,
            createdAt: values.payload.data()?.createdAt,
          });
        });
    }
  }

  handleAddAndUpdate(): void {
    if (this.ficheId) {
      this.updateFiche();
    } else {
      this.addFiche();
    }
  }

  handleAddAndUpdateFormules(): void {
    if (
      this.ficheId &&
      this.activeRoute.snapshot.routeConfig?.path === 'fiches/:id/info/edit/:id'
    ) {
      this.updateFormule();
    } else {
      this.addFormule();
    }
  }

  updateFiche(): void {
    this.fiche = {
      voornaam: this.formGroupFiches.controls['voornaam'].value,
      achternaam: this.formGroupFiches.controls['achternaam'].value,
      telefoonNummer: this.formGroupFiches.controls['telefoonNummer'].value,
      mobielNummer: this.formGroupFiches.controls['mobielNummer'].value,
      adres: this.formGroupFiches.controls['adres'].value,
    };

    this.ficheService.updateFiche(this.ficheId, this.fiche).then(() => {
      console.log('updated');
      this.location.back();
    });
  }

  updateFormule(): void {
    this.formule = {
      formuleText: this.formGroupFormules.controls['formuleText'].value,
      prijs: this.formGroupFormules.controls['prijs'].value,
      createdAt: this.formGroupFormules.controls['createdAt'].value,
      updatedAt: new Date(),
    };

    this.ficheService.updateFormule(this.ficheId, this.formule).then(() => {
      console.log('updated');
      this.location.back();
    });
  }

  addFiche(): void {
    this.fiche = {
      voornaam: this.toUppercase(
        this.formGroupFiches.controls['voornaam'].value
      ),
      achternaam: this.toUppercase(
        this.formGroupFiches.controls['achternaam'].value
      ),
      telefoonNummer: this.formGroupFiches.controls['telefoonNummer'].value,
      mobielNummer: this.formGroupFiches.controls['mobielNummer'].value,
      adres: this.formGroupFiches.controls['adres'].value,
    };

    this.ficheService.createNewFiche(this.fiche).then((data: any) => {
      console.log('created');
      this.newFicheId = data.id;
      // this.location.back();
    });
  }

  addFormule(): void {
    this.formule = {
      formuleText: this.formGroupFormules.controls['formuleText'].value,
      prijs: this.formGroupFormules.controls['prijs'].value,
      createdAt: this.formGroupFormules.controls['createdAt'].value,
      updatedAt: new Date(),
    };

    if (
      this.activeRoute.snapshot.routeConfig?.path === 'fiches/:id/info/new/:id'
    ) {
      this.ficheService
        .createNewFormuleFromExistingFiche(this.formule)
        .then((data: any) => {
          this.formule = {
            id: data.id,
            formuleText: this.formGroupFormules.controls['formuleText'].value,
            prijs: this.formGroupFormules.controls['prijs'].value,
            createdAt: this.formGroupFormules.controls['createdAt'].value,
            updatedAt: new Date(),
          };
          this.ficheService.updateFormule(data.id, this.formule).then(() => {
            console.log('created');
          });
        });
    } else {
      this.ficheService
        .createNewFormule(this.formule, this.newFicheId)
        .then((data: any) => {
          this.formule = {
            id: data.id,
          };
          this.ficheService.updateFormule(data.id, this.formule).then(() => {
            console.log('created');
          });
        });
    }
  }
}
