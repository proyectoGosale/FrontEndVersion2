import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNotasCreditoComponent } from './form-notas-credito.component';

describe('FormNotasCreditoComponent', () => {
  let component: FormNotasCreditoComponent;
  let fixture: ComponentFixture<FormNotasCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormNotasCreditoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNotasCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
