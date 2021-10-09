import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormColeccionComponent } from './form-coleccion.component';

describe('FormColeccionComponent', () => {
  let component: FormColeccionComponent;
  let fixture: ComponentFixture<FormColeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormColeccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormColeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
