import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FichesComponent } from './fiches/fiches.component';
import { HeaderComponent } from './header/header.component';
import { ContainerComponent } from './container/container.component';
import { AddFicheComponent } from './add-fiche/add-fiche.component';
import { DetailsFicheComponent } from './details-fiche/details-fiche.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderListModule } from 'primeng/orderlist';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    FichesComponent,
    HeaderComponent,
    ContainerComponent,
    AddFicheComponent,
    DetailsFicheComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ListboxModule,
    FormsModule,
    ToolbarModule,
    ButtonModule,
    TooltipModule,
    ConfirmDialogModule,
    ToastModule,
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
