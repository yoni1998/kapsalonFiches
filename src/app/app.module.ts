import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from './pipes/date.pipe';
import { NvtPipe } from './pipes/nvt.pipe';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { NumberPipe } from './pipes/number.pipe';
import { SplitButtonModule } from 'primeng/splitbutton';
import { BadgeModule } from 'primeng/badge';
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
