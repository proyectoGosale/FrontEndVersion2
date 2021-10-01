import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOrdenPedidoComponent } from './form-orden-pedido.component';

describe('FormOrdenPedidoComponent', () => {
  let component: FormOrdenPedidoComponent;
  let fixture: ComponentFixture<FormOrdenPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormOrdenPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOrdenPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
