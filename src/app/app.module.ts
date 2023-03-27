import { MessageService } from 'primeng/api';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FichesComponent } from './components/fiches/fiches.component';
import { HeaderComponent } from './components/header/header.component';
import { ContainerComponent } from './components/container/container.component';
import { AddFicheComponent } from './components/add-fiche/add-fiche.component';
import { DetailsFicheComponent } from './components/details-fiche/details-fiche.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderListModule } from 'primeng/orderlist';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { DataViewModule } from 'primeng/dataview';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from './shared/pipes/date.pipe';
import { NvtPipe } from './shared/pipes/nvt.pipe';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { NumberPipe } from './shared/pipes/number.pipe';
import { SplitButtonModule } from 'primeng/splitbutton';
import { BadgeModule } from 'primeng/badge';
import { PrijsPipe } from './shared/pipes/prijs.pipe';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AddOrUpdateDirective } from './shared/directives/add-or-update.directive';
import { HideFormIfPathStartWithFormuleDirective } from './shared/directives/hide-form-if-path-start-with-formule.directive';
import { AddOrHideFormuleTitleDirective } from './shared/directives/add-or-hide-formule-title.directive';
import { HideOrShowFormIfPathHasFicheDirective } from './shared/directives/hide-or-show-form-if-path-has-fiche.directive';
import { ErrorMessageComponent } from './ui/error-message/error-message.component';
import { RemoveAddFicheBtnDirective } from './shared/directives/remove-add-fiche-btn.directive';
import { FormuleFieldsetDirective } from './shared/directives/formule-fieldset.directive';
import { CopyBtnDisableDirective } from './shared/directives/copy-btn-disable.directive';
import { BiggerInputDirective } from './shared/directives/bigger-input.directive';
@NgModule({
  declarations: [
    AppComponent,
    FichesComponent,
    HeaderComponent,
    ContainerComponent,
    AddFicheComponent,
    DetailsFicheComponent,
    LoadingSpinnerComponent,
    DatePipe,
    NvtPipe,
    NumberPipe,
    PrijsPipe,
    AddOrUpdateDirective,
    HideFormIfPathStartWithFormuleDirective,
    AddOrHideFormuleTitleDirective,
    HideOrShowFormIfPathHasFicheDirective,
    ErrorMessageComponent,
    RemoveAddFicheBtnDirective,
    FormuleFieldsetDirective,
    CopyBtnDisableDirective,
    BiggerInputDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ListboxModule,
    FormsModule,
    BadgeModule,
    DropdownModule,
    InputTextareaModule,
    BrowserAnimationsModule,
    ToolbarModule,
    ButtonModule,
    InputSwitchModule,
    DataViewModule,
    SplitButtonModule,
    CalendarModule,
    InputTextModule,
    TooltipModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),
    ConfirmDialogModule,
    FieldsetModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OrderListModule,
    AngularFireModule.initializeApp(environment.firebase),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
