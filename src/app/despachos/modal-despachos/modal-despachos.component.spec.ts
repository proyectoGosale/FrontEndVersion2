import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDespachosComponent } from './modal-despachos.component';

describe('ModalDespachosComponent', () => {
  let component: ModalDespachosComponent;
  let fixture: ComponentFixture<ModalDespachosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDespachosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDespachosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
