import { TestBed } from '@angular/core/testing';

import { InsertarSeccionService } from './insertar-seccion.service';

describe('InsertarSeccionService', () => {
  let service: InsertarSeccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsertarSeccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
