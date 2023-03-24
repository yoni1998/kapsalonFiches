import { Form } from '../../shared/form';
import { takeUntil, switchMap } from 'rxjs/operators';
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
  formulesList: Formules[] | undefined;
  aantalFormules: any;
  actionsActive: boolean | undefined;
  isCopied: any | undefined;
  constructor(
    protected override ficheService: FichesService,
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

  showActions(): void {
    if (this.actionsActive === true) {
      this.actionsActive = false;
    } else {
      this.actionsActive = true;
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
          this.aantalFormules = data.length;
          this.formulesList = data;
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
          this.ficheService.removeFormules(item.id, this.ficheId).then(() => {
            this.toast.info('De formule is verwijderd', 'Verwijderd');
          });
        },
      });
    }
  }
}
