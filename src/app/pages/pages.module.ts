import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//shared
import { MaterialModule } from '../shared/modules/material/material.module';
import { PatternPipe } from '../shared/pipes/pattern.pipe';
import { HeaderComponent } from '../shared/components/header/header.component';
//pages
import { HomeComponent } from './home/home.component';
import { ComunicadoDeleteComponent } from './comunicado-delete/comunicado-delete.component';
import { ComunicadoFormComponent } from './comunicado-form/comunicado-form.component';
import { ComunicadosListComponent } from './comunicados-list/comunicados-list.component';
import { ComunicadosFiltroComponent } from './comunicados-list/comunicados-filtro/comunicados-filtro.component';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Moment } from 'moment';


const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
}

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    ComunicadosListComponent,
    ComunicadoFormComponent,
    PatternPipe,
    ComunicadoDeleteComponent,
    ComunicadosFiltroComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
  ]
})
export class PagesModule { }
