import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComunicadoService } from 'src/app/shared/services/comunicado.service';
import { validatorCPF } from 'src/app/shared/functions/validators';
import { haversine, distanceToString } from 'src/app/shared/functions/haversine';

@Component({
  selector: 'app-comunicado-form',
  templateUrl: './comunicado-form.component.html',
  styleUrls: ['./comunicado-form.component.scss']
})
export class ComunicadoFormComponent implements OnInit {

  public options: FormGroup
  public comunicadoForm: any
  public submitted = false
  public eventosDivirgentes: Array<any> = []
  public tiposDeLavoura: Array<any> = [
    { id: 1, descricao: "arroz" },
    { id: 2, descricao: "café" },
    { id: 3, descricao: "feijão" },
    { id: 4, descricao: "milho" },
    { id: 5, descricao: "soja" },
  ]

  constructor(private router: Router, private comunicadoService: ComunicadoService, private fb: FormBuilder) {
    this.options = fb.group({
      floatLabel: 'always'
    })
    this.comunicadoForm = this.fb.group({
      id: [null],
      cpf: ['', [Validators.required, validatorCPF()]],
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80), Validators.pattern(/[A-z]{2,}\s{1}[A-z]{1}.*/)]],
      email: ['', [Validators.required, Validators.email]],
      evento: ['', Validators.required],
      lavoura_lat: ['',
        [Validators.required, Validators.min(-90), Validators.max(90)]],
      lavoura_lon: ['',
        [Validators.required, Validators.min(-180), Validators.max(180)]],
      lavoura_tipo: ['', Validators.required],
      lavoura_data_colheita: ['', Validators.required]
    })
  }

  ngOnInit() {
    if (history.state.id)
    {
      this.comunicadoService.getComunicado(history.state.id).subscribe({
        next: res => {
          this.comunicadoForm.patchValue(res)
          this.getMesmaDataOutroMotivo()
        },
        error: e => console.warn(e)
      })
    }
  }

  onSubmit() {
    const id = this.comunicadoForm.get('id')?.value
    const body = JSON.stringify(this.comunicadoForm.value)
    if (this.comunicadoForm.invalid)
    {
      this.comunicadoForm.markAllAsTouched()
      return;
    }

    if (id !== null && id > 0) {
      this.updateComunicado(id, body)
    }
    else {
      this.addComunicado(body)
    }
  }

  addComunicado(body: string): void {
    this.comunicadoService.addComunicado(body).subscribe({
      next: r => {
        this.router.navigate(['comunicado/'], { state: { notify: "Registro adicionado com sucesso." } })
      },
      error: e => console.warn("ERRO = " + JSON.stringify(e))
    })
  }

  updateComunicado(id: number, body: string): void {
    this.comunicadoService.updateComunicado(id, body).subscribe({
      next: res => {
        this.router.navigate(['comunicado/'], { state: { notify: "Registro atualizado com sucesso." } })
      },
      error: e => console.log(e.error)
    })
  }

  getMesmaDataOutroMotivo() {
    if (this.comunicadoForm.controls.lavoura_data_colheita.invalid
      || this.comunicadoForm.controls.lavoura_lat.invalid
      || this.comunicadoForm.controls.lavoura_lon.invalid
      || this.comunicadoForm.controls.evento.invalid) {
      return false
    }

    let { id, lavoura_data_colheita, evento, lavoura_lat, lavoura_lon } = this.comunicadoForm.value

    if (lavoura_data_colheita instanceof Object) {
      lavoura_data_colheita = lavoura_data_colheita.toISOString()
    }

    this.comunicadoService.getComunicadosDivergentes(
      lavoura_data_colheita, evento, id).subscribe({
        next: (res) => {
          this.fetchDivirgentes(lavoura_lat, lavoura_lon, res.results)
        },
        error: (e) => console.warn(e)
      })
    return true
  }

  private fetchDivirgentes(latA: number, lonA: number, comunicados: Array<any>): void {
    let distancia = 0
    this.eventosDivirgentes = []
    for (let c of comunicados) {
      distancia = haversine(latA, lonA, c.lavoura_lat, c.lavoura_lon)
      if (distancia < 10.0) {
        this.eventosDivirgentes.push({ ...c, distancia: distanceToString(distancia) })
      }
    }
  }

}
