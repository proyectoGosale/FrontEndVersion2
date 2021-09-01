import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDespachosComponent } from './lista-despachos.component';

describe('ListaDespachosComponent', () => {
  let component: ListaDespachosComponent;
  let fixture: ComponentFixture<ListaDespachosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDespachosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDespachosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
