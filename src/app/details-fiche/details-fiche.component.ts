import { ConfirmationService, MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FichesService } from '../services/fiches.service';

@Component({
  selector: 'app-details-fiche',
  templateUrl: './details-fiche.component.html',
  styleUrls: ['./details-fiche.component.scss'],
})
export class DetailsFicheComponent {
  ficheId: string | null;
  constructor(
    private ficheService: FichesService,
    public route: ActivatedRoute,
    private location: Location,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.ficheId = this.route.snapshot.paramMap.get('id');
  }

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

  updateFiche(): void {
    console.log('update');
  }
}
