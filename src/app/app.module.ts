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
    ReactiveFormsModule,
    OrderListModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
