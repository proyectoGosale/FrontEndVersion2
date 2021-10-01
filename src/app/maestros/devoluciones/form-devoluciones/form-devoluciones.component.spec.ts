import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDevolucionesComponent } from './form-devoluciones.component';

describe('FormDevolucionesComponent', () => {
  let component: FormDevolucionesComponent;
  let fixture: ComponentFixture<FormDevolucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDevolucionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDevolucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
