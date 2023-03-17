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

  updateFiche(): void {
    this.fiche = {
      voornaam: this.formGroupFiches.controls['voornaam'].value,
      achternaam: this.formGroupFiches.controls['achternaam'].value,
      telefoonNummer: this.formGroupFiches.controls['telefoonNummer'].value,
      mobielNummer: this.formGroupFiches.controls['mobielNummer'].value,
      zakelijkNummer: this.formGroupFiches.controls['zakelijkNummer'].value,
      adres: this.formGroupFiches.controls['adres'].value,
      createdAt: this.formGroupFiches.controls['createdAt'].value,
    };

    this.ficheService.updateFiche(this.routeId, this.fiche).then(() => {
      this.toast.info(
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
      opmerking: this.formGroupFormules.controls['opmerking'].value,
      createdAt: this.formGroupFormules.controls['createdAt'].value,
      updatedAt: new Date(),
    };

    if (this.formGroupFormules.controls['createdAt'].value > new Date()) {
      this.toast.error(
        'De datum van het aangemaakte fiche mag niet na de huidige datum vallen'
      );
    } else {
      this.ficheService.updateFormule(this.routeId, this.formule).then(() => {
        this.toast.info('De formule is successvol gewijzigd', 'Gewijzigd');
        this.location.back();
      });
    }
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
      zakelijkNummer: this.formGroupFiches.controls['zakelijkNummer'].value,
      adres: this.formGroupFiches.controls['adres'].value,
      createdAt: new Date(),
    };

    this.ficheService.createNewFiche(this.fiche).then((data: any) => {
      this.toast.success('Het fiche is successvol aangemaakt', 'Toevoegen');
      this.recentCreatedFicheId = data.id;
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
        this.ficheService.updateFormule(data.id, this.formule).then(() => {
          this.toast.success(
            'De formule is successvol aangemaakt',
            'Toevoegen'
          );
          this.location.back();
        });
      });
  }

  // chech which form needs to be shown to the user
  get hideFormIfPathStartWithFormule(): boolean {
    if (this.location.path().substring(0, 8) === '/formule') {
      return true;
    } else {
      return false;
    }
  }

  get hideFormIfPathStartWithFiche(): boolean {
    if (this.location.path() === '/fiches/new') {
      return false;
    }
    if (this.location.path().substring(0, 8) === '/fiches/') {
      return true;
    } else {
      return false;
    }
  }

  get showFormIfPathStartWithFicheAndHasFicheId(): boolean {
    if (this.location.path() === '/fiches/new' && !this.recentCreatedFicheId) {
      return true;
    }
    return false;
  }

  get createFormuleCheck(): boolean {
    if (this.location.path().startsWith('/formule/new')) {
      return true;
    }
    return false;
  }
}
