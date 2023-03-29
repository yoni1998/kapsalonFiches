import { ExcelComponent } from './components/excel/excel.component';
import { FichesGuard } from './fiches.guard';
import { AuthComponent } from './components/auth/auth.component';
import { AddFicheComponent } from './components/add-fiche/add-fiche.component';
import { ContainerComponent } from './components/container/container.component';
import { DetailsFicheComponent } from './components/details-fiche/details-fiche.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/fiches',
  },
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'fiches',
    component: ContainerComponent,
    canActivate: [FichesGuard],
  },
  {
    path: 'fiches/new',
    component: AddFicheComponent,
    canActivate: [FichesGuard],
  },
  {
    path: 'fiches/edit/:id',
    component: AddFicheComponent,
    canActivate: [FichesGuard],
  },
  {
    path: 'fiches/:id/info',
    component: DetailsFicheComponent,
    canActivate: [FichesGuard],
  },
  {
    path: 'formule/edit/:id',
    component: AddFicheComponent,
    canActivate: [FichesGuard],
  },
  {
    path: 'formule/new/:id',
    component: AddFicheComponent,
    canActivate: [FichesGuard],
  },
  {
    path: 'fiches/excel',
    component: ExcelComponent,
    canActivate: [FichesGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
