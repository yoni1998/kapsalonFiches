import { FormulesService } from './../../services/formules.service';
import { Form } from '../../shared/form';
import { takeUntil, switchMap, take } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FichesService } from '../.././services/fiches.service';
import { map } from 'rxjs';
import { Fiche, Formules } from '../../shared/types';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-details-fiche',
  templateUrl: './details-fiche.component.html',
  styleUrls: ['./details-fiche.component.scss'],
})
export class DetailsFicheComponent extends Form implements OnInit {
  ficheId: string | null;
  klantName: string | undefined;
  klantDetails: Fiche | undefined;
  formule: Formules | undefined;
  formulesList: Formules[] | undefined;
  aantalFormules: any;
  isCopied: any | undefined;
  firstFormule: any;
  formuleId: any;
  constructor(
    protected override ficheService: FichesService,
    protected override formulesService: FormulesService,
    protected override route: ActivatedRoute,
    protected override confirmationService: ConfirmationService,
    protected override router: Router,
    protected override fb: FormBuilder,
    protected override activeRoute: ActivatedRoute,
    protected override toast: ToastrService,
    private clipboard: Clipboard
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
    this.ficheId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getKlantDetailsById();
    this.getAllFormulesOnFicheId();
  }

  copyText(textToCopy: any) {
    this.clipboard.copy(textToCopy);
    this.isCopied = textToCopy;
    this.toast.info('Nummer gekopieerd');
  }

  showActionButtons(formule: Formules) {
    this.formuleId = formule.id;
  }

  copyFormule(id: string | undefined): void {
    this.formulesService
      .getFormuleByFicheId(id, this.ficheId)
      .pipe(
        take(1),
        map((formule) => formule.payload.data()),
        takeUntil(this.destroy$$)
      )
      .subscribe((data: any) => {
        this.createDuplicateFormule(data);
      });
  }

  createDuplicateFormule(data: any): any {
    this.formule = {
      formuleText: data.formuleText,
      prijs: data.prijs,
      opmerking: data.opmerking,
      createdAt: new Date(),
      updatedAt: null,
      ficheId: data?.ficheId,
    };

    if (this.formule.formuleText.includes('idem')) {
      this.formule.formuleText = data.formuleText;
      this.formule.opmerking = data.opmerking;
    } else {
      this.formule.formuleText = 'idem ' + data.formuleText;
      if (data.opmerking === null) {
        this.formule.opmerking = 'idem NVT';
      } else {
        this.formule.opmerking = 'idem ' + data.opmerking;
      }
    }

    if (
      new Date(data.createdAt?.seconds * 1000).toDateString() ===
      new Date().toDateString()
    ) {
      this.toast.error(
        'Het is niet mogelijk om verschillende keren per dag een formule te dupliceren'
      );
    } else {
      this.confirmationService.confirm({
        message: `Weet je zeker dat je de formule wil dupliceren?`,
        accept: () => {
          this.formulesService
            .createNewFormule(this.formule, this.ficheId)
            .then(() => {
              this.toast.success(
                'De gedupliceerde formule is successvol aangemaakt',
                'Toevoegen'
              );
            });
        },
      });
    }
  }

  // delete a fiche
  deleteFiche(): void {
    if (this.ficheId) {
      this.confirmationService.confirm({
        message: `Weet je zeker dat je het fiche van ${this.klantName} wil verwijderen?`,
        accept: () => {
          this.ficheService.deleteFiche(String(this.ficheId)).then(() => {
            this.router.navigate(['/fiches']).then(() => {
              this.toast.info('Het fiche is verwijderd', 'Verwijderd');
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
          this.klantName = data?.naam;
          this.klantDetails = data;
        });
    }
  }

  // get all formules on fiche id
  getAllFormulesOnFicheId(): void {
    if (this.ficheId) {
      this.formulesService
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
          this.aantalFormules = data.length;
          this.formulesList = data;
          this.firstFormule = this.formulesList[0];
          this.showSpinner = false;
        });
    }
  }

  // remove a formule on id
  removeFormules(item: Formules): void {
    if (item.id) {
      this.confirmationService.confirm({
        message: `Weet je zeker dat je het formule wil verwijderen? Dit is definitief en kan later niet opnieuw opgevraagd worden!`,
        accept: () => {
          this.formulesService
            .removeFormules(item.id, this.ficheId)
            .then(() => {
              this.toast.info('De formule is verwijderd', 'Verwijderd');
            });
        },
      });
    }
  }
}
