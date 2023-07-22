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

  public buscaForm: FormGroup = this.fb.group({
    campo: [''],
    gte: [null],
    lte:[null],
  })

  constructor (
    private comunicadosService: ComunicadoService, 
    private router: Router, 
    private fb:FormBuilder,
    private _snackbar:MatSnackBar) { }

  ngOnInit() {
    this.comunicadosService.getComunicados().subscribe({
      next: (res) => {
        this.comunicados = res.results
        this.comunicadosCount = res.count
        this.dataSource = new MatTableDataSource( this.comunicados )
        console.info(res)
      },
      error: (e) => {
        console.warn(e)
        this.notifyErrors(e)
      }
    })

    if(history.state.notify){
      this._snackbar.open(history.state.notify, undefined,{duration: 1500})
      delete(history.state.nofify)
    }
   
  }

  applyFilter(value:string):void {
    this.dataSource.filter = value.trim().toLowerCase()
  }

  buscarComunicadosPorData(){
    console.log(this.buscaForm.value)

    if (this.buscaForm.controls['gte'].value == '' && this.buscaForm.controls['lte'].value == '') {
      window.alert('Escolha ao menos uma data maior e/ou menor')
      return false
    }

    let {campo: filtro, gte, lte} = this.buscaForm.value
    gte = gte.toISOString()
    lte = lte.toISOString()
    if (filtro == 'dtcolheita') {
      this.comunicadosService.getComunicadosFiltroDtColheita(gte, lte).subscribe({
        next: r => {
          this.comunicados = r.results
          console.log(this.comunicados)
          this.dataSource.data = [...this.comunicados]
        },
        error: e => console.warn(e.error)
      })
    } else {
      this.comunicadosService.getComunicadosFiltroDtCadastro(gte, lte)
    }
    return true
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
