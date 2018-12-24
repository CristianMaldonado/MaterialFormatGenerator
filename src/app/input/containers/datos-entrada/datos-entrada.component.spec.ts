import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosEntradaComponent } from './datos-entrada.component';

describe('DatosEntradaComponent', () => {
  let component: DatosEntradaComponent;
  let fixture: ComponentFixture<DatosEntradaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosEntradaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
