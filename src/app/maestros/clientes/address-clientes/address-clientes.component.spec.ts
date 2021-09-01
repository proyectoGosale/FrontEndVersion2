import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressClientesComponent } from './address-clientes.component';

describe('AddressClientesComponent', () => {
  let component: AddressClientesComponent;
  let fixture: ComponentFixture<AddressClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressClientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
