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

@NgModule({
  declarations: [AppComponent, FichesComponent, HeaderComponent, ContainerComponent, AddFicheComponent, DetailsFicheComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
