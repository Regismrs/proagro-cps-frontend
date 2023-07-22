import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicadosFiltroComponent } from './comunicados-filtro.component';

describe('ComunicadosFiltroComponent', () => {
  let component: ComunicadosFiltroComponent;
  let fixture: ComponentFixture<ComunicadosFiltroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComunicadosFiltroComponent]
    });
    fixture = TestBed.createComponent(ComunicadosFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
