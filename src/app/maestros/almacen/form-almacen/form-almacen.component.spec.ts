import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAlmacenComponent } from './form-almacen.component';

describe('FormAlmacenComponent', () => {
  let component: FormAlmacenComponent;
  let fixture: ComponentFixture<FormAlmacenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAlmacenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
