import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { FichesService } from '../services/fiches.service';
import { UnsubscribeBase } from './unsubscribeBase';

export class GenericCrud<T> extends UnsubscribeBase {
  constructor(
    protected ficheService: FichesService,
    protected route: ActivatedRoute,
    protected confirmationService: ConfirmationService,
    protected router: Router,
    protected fb: FormBuilder,
    protected activeRoute: ActivatedRoute
  ) {
    super();
  }
  // loading spinner
  showSpinner: boolean = true;
}
