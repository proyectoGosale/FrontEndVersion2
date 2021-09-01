import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormZonaComercialComponent } from './form-zona-comercial.component';

describe('FormZonaComercialComponent', () => {
  let component: FormZonaComercialComponent;
  let fixture: ComponentFixture<FormZonaComercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormZonaComercialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormZonaComercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
