import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicadosListComponent } from './comunicados-list.component';

describe('ComunicadosListComponent', () => {
  let component: ComunicadosListComponent;
  let fixture: ComponentFixture<ComunicadosListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComunicadosListComponent]
    });
    fixture = TestBed.createComponent(ComunicadosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
