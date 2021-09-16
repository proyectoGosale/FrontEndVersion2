import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisitasComponent } from './modal-visitas.component';

describe('ModalVisitasComponent', () => {
  let component: ModalVisitasComponent;
  let fixture: ComponentFixture<ModalVisitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVisitasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVisitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
