import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCrudProductosComponent } from './form-crud-productos.component';

describe('FormCrudProductosComponent', () => {
  let component: FormCrudProductosComponent;
  let fixture: ComponentFixture<FormCrudProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCrudProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCrudProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
