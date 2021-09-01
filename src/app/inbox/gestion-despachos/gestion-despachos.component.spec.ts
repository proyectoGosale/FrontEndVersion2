import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDespachosComponent } from './gestion-despachos.component';

describe('FormDespachosComponent', () => {
  let component: FormDespachosComponent;
  let fixture: ComponentFixture<FormDespachosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDespachosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDespachosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
