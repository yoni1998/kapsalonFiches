import { Form } from '../../shared/form';
import { FichesService } from '../../services/fiches.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { Fiche, Formules } from '../../types';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-fiche',
  templateUrl: './add-fiche.component.html',
  styleUrls: ['./add-fiche.component.scss'],
})
export class AddFicheComponent extends Form implements OnInit {
  fiche: Fiche | undefined;
  formule: Formules | undefined;
  recentCreatedFicheId: any;
  formuleId: any;
  removeAddFichesBtn: boolean = false;

  constructor(
    protected override ficheService: FichesService,
    protected override route: ActivatedRoute,
    private location: Location,
    protected override confirmationService: ConfirmationService,
    protected override router: Router,
    protected override fb: FormBuilder,
    protected override activeRoute: ActivatedRoute,
    protected override toast: ToastrService
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

  goBack(): void {
    this.location.back();
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

  addFiche(): void {
    this.fiche = {
      naam: this.toUppercase(this.formGroupFiches.controls['naam'].value),
      telefoonNummer: this.formGroupFiches.controls['telefoonNummer'].value,
      mobielNummer: this.formGroupFiches.controls['mobielNummer'].value,
      zakelijkNummer: this.formGroupFiches.controls['zakelijkNummer'].value,
      adres: this.toUppercase(this.formGroupFiches.controls['adres'].value),
      createdAt: new Date(),
    };

    this.ficheService.createNewFiche(this.fiche).then((data: any) => {
      this.toast.success('Het fiche is successvol aangemaakt', 'Toevoegen');
      this.recentCreatedFicheId = data.id;
      this.formGroupFiches?.disable();
      this.removeAddFichesBtn = true;
    });
  }

  addFormule(): void {
    this.formule = {
      formuleText: this.formGroupFormules.controls['formuleText'].value,
      prijs: this.formGroupFormules.controls['prijs'].value,
      opmerking: this.formGroupFormules.controls['opmerking'].value,
      createdAt: this.formGroupFormules.controls['createdAt'].value,
      updatedAt: null,
      ficheId: this.routeId ? this.routeId : this.recentCreatedFicheId,
    };

    this.ficheService
      .createNewFormule(this.formule, this.routeId, this.recentCreatedFicheId)
      .then((data: any) => {
        this.formule = {
          id: data.id,
          formuleText: this.formGroupFormules.controls['formuleText'].value,
          prijs: this.formGroupFormules.controls['prijs'].value,
          opmerking: this.formGroupFormules.controls['opmerking'].value,
          createdAt: this.formGroupFormules.controls['createdAt'].value,
          updatedAt: null,
          ficheId: this.routeId ? this.routeId : this.recentCreatedFicheId,
        };

        if (this.formGroupFormules.controls['createdAt'].value > new Date()) {
          this.toast.error(
            'De datum van het aangemaakte formule mag niet na de huidige datum vallen'
          );
        } else {
          this.ficheService.updateFormule(data.id, this.formule).then(() => {
            this.toast.success(
              'De formule is successvol aangemaakt',
              'Toevoegen'
            );
            this.location.back();
          });
        }
      });
  }

  updateFiche(): void {
    this.fiche = {
      naam: this.toUppercase(this.formGroupFiches.controls['naam'].value),
      telefoonNummer: this.formGroupFiches.controls['telefoonNummer'].value,
      mobielNummer: this.formGroupFiches.controls['mobielNummer'].value,
      zakelijkNummer: this.formGroupFiches.controls['zakelijkNummer'].value,
      adres: this.toUppercase(this.formGroupFiches.controls['adres'].value),
      createdAt: this.formGroupFiches.controls['createdAt'].value,
    };

    this.ficheService.updateFiche(this.routeId, this.fiche).then(() => {
      this.toast.info(
        `Het fiche van ${this.fiche?.naam} is successvol gewijzigd`,
        'Gewijzigd'
      );
      this.location.back();
    });
  }

  updateFormule(): void {
    this.formule = {
      formuleText: this.formGroupFormules.controls['formuleText'].value,
      prijs: this.formGroupFormules.controls['prijs'].value,
      opmerking: this.formGroupFormules.controls['opmerking'].value,
      createdAt: this.formGroupFormules.controls['createdAt'].value,
      updatedAt: new Date(),
    };

    if (this.formGroupFormules.controls['createdAt'].value > new Date()) {
      this.toast.error(
        'De datum van het aangemaakte formule mag niet na de huidige datum vallen'
      );
    } else {
      this.ficheService.updateFormule(this.routeId, this.formule).then(() => {
        this.toast.info('De formule is successvol gewijzigd', 'Gewijzigd');
        this.location.back();
      });
    }
  }
}
