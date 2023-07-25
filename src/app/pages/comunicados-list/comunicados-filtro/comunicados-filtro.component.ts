import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-comunicados-filtro',
  templateUrl: './comunicados-filtro.component.html',
  styleUrls: ['./comunicados-filtro.component.scss']
})
export class ComunicadosFiltroComponent {
  @Input() isLoading:boolean = false
  @Output() filtroAlterado:EventEmitter<any> = new EventEmitter<any>()
  public filtro:string
  public dataMinima:Date|null
  public dataMaxima:Date|null

  constructor() {
    this.filtro = ""
    this.dataMinima = null
    this.dataMaxima = null
  }

  montarFiltro() {
    if (this.filtro != "")
    {
      if (this.dataMinima || this.dataMaxima)
      {
        this.filtroAlterado.emit({
          filtro: this.filtro,
          dataMinima: this.converteDataParaString(this.dataMinima, "1900-01-01"),
          dataMaxima: this.converteDataParaString(this.dataMaxima, "2999-12-31")
        })
      }
      else
      {
        window.alert("Informe ao menos uma data válida.")
      }
    }
    else
    {
      this.filtroAlterado.emit({filtro: "todos"})
    }
  }

  converteDataParaString(data:any, dataIfNull:string)
  {
    return (data != null) ? data.toISOString() : dataIfNull
  }
}
