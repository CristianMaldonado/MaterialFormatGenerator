import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeanResponseComponent } from './bean-response.component';

describe('BeanResponseComponent', () => {
  let component: BeanResponseComponent;
  let fixture: ComponentFixture<BeanResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeanResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeanResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
