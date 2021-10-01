import { TestBed } from '@angular/core/testing';

import { FormCuentasPorCobrarService } from './form-cuentas-por-cobrar.service';

describe('FormCuentasPorCobrarService', () => {
  let service: FormCuentasPorCobrarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormCuentasPorCobrarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
