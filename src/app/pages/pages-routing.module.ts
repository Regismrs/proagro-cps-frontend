import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComunicadoFormComponent } from './comunicado-form/comunicado-form.component';
import { ComunicadoFormDeleteComponent } from './comunicado-form-delete/comunicado-form-delete.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'comunicado', component: HomeComponent, pathMatch: 'full'},
  {path: 'comunicado/form', component: ComunicadoFormComponent},
  {path: 'comunicado/delete', component: ComunicadoFormDeleteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
