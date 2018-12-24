import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeanRequestComponent } from './bean-request.component';

describe('BeanRequestComponent', () => {
  let component: BeanRequestComponent;
  let fixture: ComponentFixture<BeanRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeanRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeanRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
