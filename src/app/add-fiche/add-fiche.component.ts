import { GenericCrud } from './../shared/generic-crud';
import { FichesService } from './../services/fiches.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fiche, Formules } from '../types';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

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
  routeId: any;
  recentCreatedFicheId: any;
  formuleId: any;
  currentDate: Date;
  constructor(
    protected override ficheService: FichesService,
    protected override route: ActivatedRoute,
    private location: Location,
    protected override confirmationService: ConfirmationService,
    protected override router: Router,
    protected override fb: FormBuilder,
    protected override activeRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    super(ficheService, route, confirmationService, router, fb, activeRoute);

    this.currentDate = new Date();
    this.formGroupFiches = this.fb.group({
      voornaam: [null, [Validators.required]],
      achternaam: [null, [Validators.required]],
      telefoonNummer: [null],
      mobielNummer: [null],
      adres: [null],
    });

    this.formGroupFormules = this.fb.group({
      formuleText: [null],
      prijs: [null],
      createdAt: [this.currentDate, [Validators.required]],
      updatedAt: [null],
    });
  }

  toUppercase(name: string): string {
    return name.substring(0, 1).toUpperCase() + name.substring(1);
  }

  patchKlantFormValues(klant: any): void {
    this.formGroupFiches.patchValue({
      voornaam: klant.payload.data()?.voornaam,
      achternaam: klant.payload.data()?.achternaam,
      telefoonNummer: klant.payload.data()?.telefoonNummer,
      mobielNummer: klant.payload.data()?.mobielNummer,
      adres: klant.payload.data()?.adres,
    });
  }

  patchFormuleFormValues(formule: any): void {
    this.formGroupFormules.patchValue({
      formuleText: formule.payload.data()?.formuleText,
      prijs: formule.payload.data()?.prijs,
      createdAt: formule.payload.data()?.createdAt,
    });
  }

  patchForm(): void {
    if (
      this.routeId &&
      this.activeRoute.snapshot.routeConfig?.path === 'fiches/edit/:id'
    ) {
      this.ficheService
        .getKlantDetailsById(this.routeId)
        .pipe(takeUntil(this.destroy$$))
        .subscribe((data) => {
          this.patchKlantFormValues(data);
        });
    }

    if (
      this.routeId &&
      this.activeRoute.snapshot.routeConfig?.path === 'formule/edit/:id'
    ) {
      this.ficheService
        .getFormuleByFicheId(this.routeId)
        .pipe(takeUntil(this.destroy$$))
        .subscribe((data: any) => {
          this.patchFormuleFormValues(data);
        });
    }
  }

  ngOnInit(): void {
    this.routeId = this.activeRoute.snapshot.paramMap.get('id');
    this.patchForm();
  }

  handleAddAndUpdate(): void {
    if (this.routeId) {
      this.updateFiche();
    } else {
      this.addFiche();
    }
  }

  handleAddAndUpdateFormules(): void {
    if (
      this.routeId &&
      this.activeRoute.snapshot.routeConfig?.path === 'formule/edit/:id'
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

    this.ficheService.updateFiche(this.routeId, this.fiche).then(() => {
      this.toastr.info(
        `Het fiche van ${this.fiche?.achternaam} ${this.fiche?.voornaam} is successvol gewijzigd`,
        'Gewijzigd'
      );
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

    this.ficheService.updateFormule(this.routeId, this.formule).then(() => {
      this.toastr.info('De formule is successvol gewijzigd', 'Gewijzigd');
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
      this.toastr.success('Het fiche is successvol aangemaakt', 'Toevoegen');
      this.recentCreatedFicheId = data.id;
      this.location.back();
    });
  }

  addFormule(): void {
    this.formule = {
      formuleText: this.formGroupFormules.controls['formuleText'].value,
      prijs: this.formGroupFormules.controls['prijs'].value,
      createdAt: this.formGroupFormules.controls['createdAt'].value,
      updatedAt: null,
    };
    if (this.activeRoute.snapshot.routeConfig?.path === 'formule/new/:id') {
      this.ficheService
        .createNewFormuleFromExistingFiche(this.formule)
        .then((data: any) => {
          this.formule = {
            id: data.id,
            formuleText: this.formGroupFormules.controls['formuleText'].value,
            prijs: this.formGroupFormules.controls['prijs'].value,
            createdAt: this.formGroupFormules.controls['createdAt'].value,
            updatedAt: null,
          };
          this.ficheService.updateFormule(data.id, this.formule).then(() => {
            this.toastr.success(
              'De formule is successvol aangemaakt',
              'Toevoegen'
            );
            this.location.back();
          });
        });
    } else {
      this.ficheService
        .createNewFormule(this.formule, this.recentCreatedFicheId)
        .then((data: any) => {
          this.formule = {
            id: data.id,
          };
          this.ficheService.updateFormule(data.id, this.formule).then(() => {
            this.toastr.success(
              'De formule is successvol aangemaakt',
              'Toevoegen'
            );
            this.location.back();
          });
        });
    }
  }
}
