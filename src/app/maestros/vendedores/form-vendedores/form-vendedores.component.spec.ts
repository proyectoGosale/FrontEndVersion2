import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVendedoresComponent } from './form-vendedores.component';

describe('FormVendedoresComponent', () => {
  let component: FormVendedoresComponent;
  let fixture: ComponentFixture<FormVendedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormVendedoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormVendedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
