import { Component } from '@angular/core';

@Component({
  selector: 'app-comunicados-filtro',
  templateUrl: './comunicados-filtro.component.html',
  styleUrls: ['./comunicados-filtro.component.scss']
})
export class ComunicadosFiltroComponent {
  public filtro:string
  public dataMinima:Date|null
  public dataMaxima:Date|null

  constructor() {
    this.filtro = ""
    this.dataMinima = null
    this.dataMaxima = null
  }

  realizarBuscaFiltrada() {
    if (this.filtro != "")
    {
      if (this.dataMinima || this.dataMaxima)
      {
        console.log(
          this.filtro,
          this.converteDataParaString(this.dataMinima, "1900-01-01"),
          this.converteDataParaString(this.dataMaxima, "2999-12-31")
        ) 
      }
      else
      {
        window.alert("Informe ao menos uma data válida.")
      }
    }
    else
    {
      console.log("Todos", null, null)
    }
  }

  converteDataParaString(data:any, dataIfNull:string)
  {
    return (data != null) ? data.toISOString() : dataIfNull
  }
}
