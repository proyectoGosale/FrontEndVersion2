import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDespachoComponent } from './form-despacho.component';

describe('FormDespachoComponent', () => {
  let component: FormDespachoComponent;
  let fixture: ComponentFixture<FormDespachoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDespachoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDespachoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
