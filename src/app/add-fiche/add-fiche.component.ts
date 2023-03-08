import { FichesService } from './../services/fiches.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fiche } from '../types';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-fiche',
  templateUrl: './add-fiche.component.html',
  styleUrls: ['./add-fiche.component.scss'],
})
export class AddFicheComponent implements OnInit {
  formGroupFiches: FormGroup;
  fiche: Fiche | undefined;
  ficheId: any;
  constructor(
    private location: Location,
    private fb: FormBuilder,
    private ficheService: FichesService,
    private activeRoute: ActivatedRoute
  ) {
    this.formGroupFiches = this.fb.group({
      voornaam: [null, [Validators.required]],
      achternaam: [null, [Validators.required]],
      telefoonNummer: [null, [Validators.required]],
      nummer: [null, [Validators.required]],
      adres: [null, [Validators.required]],
    });
    this.ficheId = this.activeRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.ficheId) {
      this.ficheService.getFicheById(this.ficheId).subscribe((data) => {
        this.formGroupFiches.patchValue({
          voornaam: data.payload.data()?.voornaam,
          achternaam: data.payload.data()?.achternaam,
          telefoonNummer: data.payload.data()?.telefoonNummer,
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
      adres: this.formGroupFiches.controls['adres'].value,
    };

    this.ficheService.updateFiche(this.ficheId, this.fiche).then(() => {
      console.log('updated');
      this.location.back();
    });
  }

  addFiche(): void {
    this.fiche = {
      voornaam: this.formGroupFiches.controls['voornaam'].value,
      achternaam: this.formGroupFiches.controls['achternaam'].value,
      telefoonNummer: this.formGroupFiches.controls['telefoonNummer'].value,
      adres: this.formGroupFiches.controls['adres'].value,
    };

    this.ficheService.createNewFiche(this.fiche).then(() => {
      console.log('created');
      this.location.back();
    });
  }
}
