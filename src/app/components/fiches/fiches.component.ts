import { FichesService } from '../../services/fiches.service';
import { Component, OnInit } from '@angular/core';
import { Fiche } from '../../types';
import { map, takeUntil } from 'rxjs/operators';
import { GenericCrud } from '../../shared/generic-crud';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-fiches',
  templateUrl: './fiches.component.html',
  styleUrls: ['./fiches.component.scss'],
})
export class FichesComponent extends GenericCrud<Fiche> implements OnInit {
  fichesList: Fiche[] = [];
  selectedFiche: Fiche | undefined;

  constructor(
    protected override ficheService: FichesService,
    protected override route: ActivatedRoute,
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
    this.getFiches();
  }

  // get all fiches
  getFiches(): void {
    this.ficheService
      .getAllFiches()
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
        this.fichesList = data;
        this.showSpinner = false;
      });
  }
}
