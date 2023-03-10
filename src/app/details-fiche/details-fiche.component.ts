import { GenericCrud } from './../shared/generic-crud';
import { takeUntil, switchMap } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FichesService } from '../services/fiches.service';
import { map } from 'rxjs';
import { Fiche, Formules } from '../types';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details-fiche',
  templateUrl: './details-fiche.component.html',
  styleUrls: ['./details-fiche.component.scss'],
})
export class DetailsFicheComponent
  extends GenericCrud<Fiche>
  implements OnInit
{
  ficheId: string | null | undefined;
  klantName: string | undefined;
  KlantDetails: Fiche | undefined;
  formulesList: Formules[] | undefined;
  constructor(
    protected override ficheService: FichesService,
    protected override route: ActivatedRoute,
    protected override confirmationService: ConfirmationService,
    protected override router: Router,
    protected override fb: FormBuilder,
    protected override activeRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    super(ficheService, route, confirmationService, router, fb, activeRoute);
  }

  ngOnInit(): void {
    this.ficheId = this.route.snapshot.paramMap.get('id');
    this.getKlantDetailsById();
    this.getAllFormulesOnFicheId();
  }

  // delete a fiche
  deleteFiche(): void {
    if (this.ficheId) {
      this.confirmationService.confirm({
        message: `Weet je zeker dat je het fiche van ${this.klantName} wil verwijderen?`,
        accept: () => {
          this.ficheService.deleteFiche(String(this.ficheId)).then(() => {
            this.router.navigate(['/fiches']).then(() => {
              this.toastr.info('Het fiche is verwijderd', 'Verwijderd');
            });
          });
        },
      });
    }
  }

  // get a fiche on id
  getKlantDetailsById(): void {
    if (this.ficheId) {
      this.ficheService
        .getKlantDetailsById(this.ficheId)
        .pipe(
          switchMap(async (data) => data.payload.data()),
          takeUntil(this.destroy$$)
        )
        .subscribe((data) => {
          this.klantName = data?.achternaam + ' ' + data?.voornaam;
          this.KlantDetails = data;
        });
    }
  }

  // get all formules on fiche id
  getAllFormulesOnFicheId(): void {
    if (this.ficheId) {
      this.ficheService
        .getAllFormulesOnFicheId(this.ficheId)
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
          this.formulesList = data;
        });
    }
  }

  // convert seconds to a Date object
  convertToDate(date: any): any {
    return new Date(date?.seconds * 1000).toDateString();
  }

  // remove a formule on id
  removeFormules(item: Formules): void {
    if (item.id) {
      this.confirmationService.confirm({
        message: `Weet je zeker dat je het formule wil verwijderen? Dit is definitief en kan later niet opnieuw opgevraagd worden!`,
        accept: () => {
          this.ficheService.removeFormules(item.id).then(() => {
            this.toastr.info('De formule is verwijderd', 'Verwijderd');
          });
        },
      });
    }
  }
}
