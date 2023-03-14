import { takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { FichesService } from '../services/fiches.service';
import { UnsubscribeBase } from './unsubscribeBase';
import { ToastrService } from 'ngx-toastr';
export class Form extends UnsubscribeBase {
  formGroupFiches: FormGroup;
  formGroupFormules: FormGroup;
  currentDate: Date;
  routeId: any;
  constructor(
    protected ficheService: FichesService,
    protected route: ActivatedRoute,
    protected confirmationService: ConfirmationService,
    protected router: Router,
    protected fb: FormBuilder,
    protected activeRoute: ActivatedRoute,
    protected toast: ToastrService
  ) {
    super();
    this.currentDate = new Date();

    this.formGroupFiches = this.fb.group({
      voornaam: [null, [Validators.required]],
      achternaam: [null, [Validators.required]],
      telefoonNummer: [null],
      mobielNummer: [null],
      zakelijkNummer: [null],
      adres: [null],
      createdAt: [null],
    });

    this.formGroupFormules = this.fb.group({
      formuleText: [null, [Validators.required]],
      prijs: [null, [Validators.max(500)]],
      opmerking: [null],
      createdAt: [this.currentDate, [Validators.required]],
      updatedAt: [null],
    });
  }
  // loading spinner
  showSpinner: boolean = true;

  // validators
  phoneNumberValidation(): void {
    if (
      this.formGroupFiches.controls['telefoonNummer'].value?.toString().length >
        9 ||
      this.formGroupFiches.controls['telefoonNummer'].value?.toString().length <
        7
    ) {
      this.formGroupFiches.controls['telefoonNummer'].setErrors({
        incorrect: true,
      });
    }
  }

  mobileNumberValidation(): void {
    if (
      this.formGroupFiches.controls['mobielNummer'].value?.toString().length >
        11 ||
      this.formGroupFiches.controls['mobielNummer'].value?.toString().length < 9
    ) {
      this.formGroupFiches.controls['mobielNummer'].setErrors({
        incorrect: true,
      });
    }
  }

  zakelijkNumberValidation(): void {
    if (
      this.formGroupFiches.controls['zakelijkNummer'].value?.toString().length >
        11 ||
      this.formGroupFiches.controls['zakelijkNummer'].value?.toString().length <
        9
    ) {
      this.formGroupFiches.controls['zakelijkNummer'].setErrors({
        incorrect: true,
      });
    }
  }

  fillInZakelijkNumber(): void {
    if (!this.formGroupFiches.controls['zakelijkNummer'].value) {
      this.formGroupFiches.controls['zakelijkNummer'].setValue('02');
    }
  }
  fillInPhoneNumber(): void {
    if (!this.formGroupFiches.controls['telefoonNummer'].value) {
      this.formGroupFiches.controls['telefoonNummer'].setValue('02');
    }
  }
  fillInMobileNumber(): void {
    if (!this.formGroupFiches.controls['mobielNummer'].value) {
      this.formGroupFiches.controls['mobielNummer'].setValue('324');
    }
  }

  // tranform data
  toUppercase(name: string): string {
    return name.substring(0, 1).toUpperCase() + name.substring(1);
  }

  convertToDate(date: any): any {
    return new Date(date?.seconds * 1000).toDateString();
  }

  // patch form
  patchKlantFormValues(klant: any): void {
    this.formGroupFiches.patchValue({
      voornaam: klant.payload.data()?.voornaam,
      achternaam: klant.payload.data()?.achternaam,
      telefoonNummer: klant.payload.data()?.telefoonNummer,
      mobielNummer: klant.payload.data()?.mobielNummer,
      zakelijkNummer: klant.payload.data().zakelijkNummer,
      adres: klant.payload.data()?.adres,
      createdAt: klant.payload.data().createdAt,
    });
  }

  patchFormuleFormValues(formule: any): void {
    this.formGroupFormules.patchValue({
      formuleText: formule.payload.data()?.formuleText,
      prijs: formule.payload.data()?.prijs,
      opmerking: formule.payload.data()?.opmerking,
      createdAt: new Date(
        this.convertToDate(formule.payload.data()?.createdAt)
      ),
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
}
