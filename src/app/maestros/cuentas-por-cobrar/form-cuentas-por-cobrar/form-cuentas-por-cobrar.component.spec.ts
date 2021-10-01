import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCuentasPorCobrarComponent } from './form-cuentas-por-cobrar.component';

describe('FormCuentasPorCobrarComponent', () => {
  let component: FormCuentasPorCobrarComponent;
  let fixture: ComponentFixture<FormCuentasPorCobrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCuentasPorCobrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCuentasPorCobrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
