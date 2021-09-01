import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacidadDisponibleComponent } from './capacidad-disponible.component';

describe('CapacidadDisponibleComponent', () => {
  let component: CapacidadDisponibleComponent;
  let fixture: ComponentFixture<CapacidadDisponibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacidadDisponibleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacidadDisponibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
