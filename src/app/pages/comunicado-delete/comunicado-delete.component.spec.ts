import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicadoDeleteComponent } from './comunicado-delete.component';

describe('ComunicadoDeleteComponent', () => {
  let component: ComunicadoDeleteComponent;
  let fixture: ComponentFixture<ComunicadoDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComunicadoDeleteComponent]
    });
    fixture = TestBed.createComponent(ComunicadoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
