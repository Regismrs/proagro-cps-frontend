import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-comunicados-paginacao',
  templateUrl: './comunicados-paginacao.component.html',
  styleUrls: ['./comunicados-paginacao.component.scss']
})
export class ComunicadosPaginacaoComponent {
  @ViewChild(MatPaginator, {static: true}) paginator!:MatPaginator
  @Input() length:number = 0

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Resultados por página';
  }
}
