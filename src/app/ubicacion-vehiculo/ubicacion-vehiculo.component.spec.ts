import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionVehiculoComponent } from './ubicacion-vehiculo.component';

describe('UbicacionVehiculoComponent', () => {
  let component: UbicacionVehiculoComponent;
  let fixture: ComponentFixture<UbicacionVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UbicacionVehiculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UbicacionVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
