import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicadoFormComponent } from './comunicado-form.component';

describe('ComunicadoFormComponent', () => {
  let component: ComunicadoFormComponent;
  let fixture: ComponentFixture<ComunicadoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComunicadoFormComponent]
    });
    fixture = TestBed.createComponent(ComunicadoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
