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

  constructor (
    private comunicadosService: ComunicadoService, 
    private router: Router, 
    private fb:FormBuilder,
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

    if (event.filtro == "dtcadastro")
    {
      buscaObservable = this.comunicadosService.getComunicadosFiltroDtCadastro(event.dataMinima, event.dataMaxima)
    }
    else if (event.filtro == "dtcolheita")
    {
      buscaObservable = this.comunicadosService.getComunicadosFiltroDtColheita(event.dataMinima, event.dataMaxima)
    }
    else
    {
      buscaObservable = this.comunicadosService.getComunicados()
    }

    this.isLoading = true
    buscaObservable.subscribe({
      next: (res) => {
        this.comunicados = res.results
        this.comunicadosCount = res.count
        this.dataSource = new MatTableDataSource( this.comunicados )
        console.info(res)
        this.isLoading = false
      },
      error: (e) => {
        console.warn(e)
        this.notifyErrors(e)
        this.isLoading = false
      }
    })
  }

  getServerData(event:any) {
    console.info(event)
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
