import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaComercialComponent } from './zona-comercial.component';

describe('ZonaComercialComponent', () => {
  let component: ZonaComercialComponent;
  let fixture: ComponentFixture<ZonaComercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZonaComercialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonaComercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
