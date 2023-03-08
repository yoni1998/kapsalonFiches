import { FichesService } from './../services/fiches.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fiche } from '../types';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { UnsubscribeBase } from '../shared/unsubscribeBase';
@Component({
  selector: 'app-add-fiche',
  templateUrl: './add-fiche.component.html',
  styleUrls: ['./add-fiche.component.scss'],
})
export class AddFicheComponent
  extends UnsubscribeBase<Fiche>
  implements OnInit
{
  formGroupFiches: FormGroup;
  fiche: Fiche | undefined;
  ficheId: any;
  constructor(
    private location: Location,
    private fb: FormBuilder,
    private ficheService: FichesService,
    private activeRoute: ActivatedRoute
  ) {
    super();
    this.formGroupFiches = this.fb.group({
      voornaam: [null, [Validators.required]],
      achternaam: [null, [Validators.required]],
      telefoonNummer: [null],
      mobielNummer: [null, [Validators.required]],
      adres: [null, [Validators.required]],
    });
    this.ficheId = this.activeRoute.snapshot.paramMap.get('id');
  }

  toUppercase(name: string): string {
    return name.substring(0, 1).toUpperCase() + name.substring(1);
  }

  ngOnInit(): void {
    if (this.ficheId) {
      this.ficheService
        .getFicheById(this.ficheId)
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
  }

  handleAddAndUpdate(): void {
    if (this.ficheId) {
      this.updateFiche();
    } else {
      this.addFiche();
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

    this.ficheService.createNewFiche(this.fiche).then(() => {
      console.log('created');
      this.location.back();
    });
  }
}
