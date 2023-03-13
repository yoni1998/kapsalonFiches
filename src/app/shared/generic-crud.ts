import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { FichesService } from '../services/fiches.service';
import { UnsubscribeBase } from './unsubscribeBase';
import { ToastrService } from 'ngx-toastr';
export class GenericCrud<T> extends UnsubscribeBase {
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
  }
  // loading spinner
  showSpinner: boolean = true;
}
