import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicadoFormDeleteComponent } from './comunicado-form-delete.component';

describe('ComunicadoFormDeleteComponent', () => {
  let component: ComunicadoFormDeleteComponent;
  let fixture: ComponentFixture<ComunicadoFormDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComunicadoFormDeleteComponent]
    });
    fixture = TestBed.createComponent(ComunicadoFormDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
