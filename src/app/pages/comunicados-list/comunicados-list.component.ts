import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ComunicadoService } from '../../shared/services/comunicado.service';
import { PatternPipe } from '../../shared/pipes/pattern.pipe';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comunicados-list',
  templateUrl: './comunicados-list.component.html',
  styleUrls: ['./comunicados-list.component.scss']
})
export class ComunicadosListComponent {
  
  public comunicados:Array<any> = []
  public comunicadosCount:number = 0

  public displayColumns = ['id','nome','cpf', 'evento_descr', 'lavoura_data_colheita', 'inserted_at', 'actions']
  public dataSource:any

  public isLoading:boolean = false
  private filtro:{filtro:string, dataMinima:string, dataMaxima:string, limit:number, offset:number} = {
    dataMinima: "1900-01-01",
    dataMaxima: "2999-12-31",
    filtro: '',
    limit: 5,
    offset: 0
  }

  constructor (
    private comunicadosService: ComunicadoService, 
    private router: Router, 
    private _snackbar:MatSnackBar) { }

  ngOnInit() {
    this.buscarComunicados({filtro: ""})

    if(history.state.notify){
      this._snackbar.open(history.state.notify, undefined,{duration: 1500})
      delete(history.state.nofify)
    }
   
  }

  applyFilter(value:string):void {
    this.dataSource.filter = value.trim().toLowerCase()
  }

  buscarComunicados(event:any){
    let buscaObservable:Observable<any>
    this.isLoading = true

    this.filtro = {...this.filtro, ...event}

    if (this.filtro.filtro == "dtcadastro")
    {
      buscaObservable = this.comunicadosService
        .getComunicadosFiltroDtCadastro(
          this.filtro.dataMinima, 
          this.filtro.dataMaxima, 
          this.filtro.limit, 
          this.filtro.offset
        )
    }
    else if (this.filtro.filtro == "dtcolheita")
    {
      buscaObservable = this.comunicadosService
        .getComunicadosFiltroDtColheita(
          this.filtro.dataMinima, 
          this.filtro.dataMaxima, 
          this.filtro.limit, 
          this.filtro.offset
        )
    }
    else
    {
      buscaObservable = this.comunicadosService.getComunicados(
        this.filtro.limit, 
        this.filtro.offset
      )
    }

    buscaObservable.subscribe({
      next: (res) => {
        this.comunicados = res.results
        this.comunicadosCount = res.count
        this.dataSource = new MatTableDataSource( this.comunicados )
        this.isLoading = false
      },
      error: (e) => {
        this.notifyErrors(e)
        this.isLoading = false
      }
    })
  }

  edit(id:any){
    this.router.navigate(['comunicado/form'], {state: {id: id} })
  }

  delete(id:any) {
    this.router.navigate(['comunicado/delete'], {state: {id: id}})
  }

  notifyErrors(e:HttpErrorResponse):void {
    this._snackbar.open(`Erro ${e.status} - ${e.statusText}: ${e.error.detail}`, "close", {panelClass: 'snack-bar-notify-error'})
  }
}
