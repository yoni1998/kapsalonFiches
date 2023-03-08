import { AddFicheComponent } from './add-fiche/add-fiche.component';
import { ContainerComponent } from './container/container.component';
import { DetailsFicheComponent } from './details-fiche/details-fiche.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/fiches',
  },
  {
    path: 'fiches',
    component: ContainerComponent,
  },
  {
    path: 'fiches/new',
    component: AddFicheComponent,
  },
  {
    path: 'fiches/new/:id',
    component: AddFicheComponent,
  },
  {
    path: 'fiches/:id/info',
    component: DetailsFicheComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
