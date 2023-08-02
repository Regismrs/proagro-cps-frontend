import { Component, EventEmitter, Input, Output, AfterViewInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-comunicados-paginacao',
  templateUrl: './comunicados-paginacao.component.html',
  styleUrls: ['./comunicados-paginacao.component.scss']
})
export class ComunicadosPaginacaoComponent implements AfterViewInit, OnChanges{
  @ViewChild(MatPaginator, {static: true}) paginator!:MatPaginator
  @Input() length:number | null = null
  @Input() pageIndex:number = 0
  @Output() pageChange:EventEmitter<{limit:number, offset:number}> = 
    new EventEmitter<{limit:number, offset:number}>()

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Resultados por página';
  }

  ngOnChanges(changes:SimpleChanges){
    if (changes['length'] && this.length !== null)
    {
      this.paginator.pageIndex = 0
    }
  }

  onPageChange(event:any) {
    const offset = event.pageIndex * event.pageSize
    this.pageChange.emit({limit: event.pageSize, offset: offset})
  }
}
