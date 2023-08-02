import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ComunicadoService } from 'src/app/shared/services/comunicado.service';

@Component({
  selector: 'app-comunicado-delete',
  templateUrl: './comunicado-delete.component.html',
  styleUrls: ['./comunicado-delete.component.scss']
})
export class ComunicadoDeleteComponent {

  public comunicado: any

  constructor(private comunicadoService: ComunicadoService, private router: Router) {
    if (!history.state.id) this.router.navigate([''])
    this.comunicadoService.getComunicado(history.state.id).subscribe({
      next: r => {
        this.comunicado = r
      }
    })
  }

  confirmaExclusao() {
    this.comunicadoService.deleteComunicado(this.comunicado.id).subscribe({
      next: res => {
        this.router.navigate(['comunicado/'], { state: { notify: "Registro excluído com sucesso." } })
      },
      error: e => console.warn(e)
    })
  }

  cancelaExclusao() {
    this.router.navigate(['comunicado/'])
  }

}
