import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComunicadoFormComponent } from './comunicado-form/comunicado-form.component';
import { ComunicadoDeleteComponent } from './comunicado-delete/comunicado-delete.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'comunicado', component: HomeComponent, pathMatch: 'full'},
  {path: 'comunicado/form', component: ComunicadoFormComponent},
  {path: 'comunicado/delete', component: ComunicadoDeleteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
