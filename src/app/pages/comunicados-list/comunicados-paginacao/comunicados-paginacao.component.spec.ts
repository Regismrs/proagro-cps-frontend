import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicadosPaginacaoComponent } from './comunicados-paginacao.component';

describe('ComunicadosPaginacaoComponent', () => {
  let component: ComunicadosPaginacaoComponent;
  let fixture: ComponentFixture<ComunicadosPaginacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComunicadosPaginacaoComponent]
    });
    fixture = TestBed.createComponent(ComunicadosPaginacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
