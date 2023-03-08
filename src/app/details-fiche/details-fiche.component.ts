import { UnsubscribeBase } from './../shared/unsubscribeBase';
import { takeUntil } from 'rxjs/operators';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FichesService } from '../services/fiches.service';
import { map } from 'rxjs';
import { Fiche } from '../types';

@Component({
  selector: 'app-details-fiche',
  templateUrl: './details-fiche.component.html',
  styleUrls: ['./details-fiche.component.scss'],
})
export class DetailsFicheComponent extends UnsubscribeBase<Fiche> {
  ficheId: string | null;
  ficheDetails: Fiche | undefined;
  constructor(
    private ficheService: FichesService,
    public route: ActivatedRoute,
    private location: Location,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {
    super();
    this.ficheId = this.route.snapshot.paramMap.get('id');
    this.getFicheById(String(this.ficheId));
  }

  // delete a fiche
  deleteFiche(): void {
    if (this.ficheId) {
      this.confirmationService.confirm({
        message: 'Weet je zeker dat je dit klantenfiche wil verwijderen?',
        accept: () => {
          this.ficheService.deleteFiche(String(this.ficheId)).then(() => {
            this.location.back();
          });
        },
      });
    }
  }

  // get a fiche on id
  getFicheById(id: string): void {
    if (this.ficheId) {
      this.ficheService
        .getFicheById(id)
        .pipe(
          map((data) => data.payload.data()),
          takeUntil(this.destroy$$)
        )
        .subscribe((data) => {
          this.ficheDetails = data;
        });
    }
  }

  // update a fiche
  updateFiche(): void {
    this.router.navigate(['fiches/new', this.ficheId]);
  }
}
