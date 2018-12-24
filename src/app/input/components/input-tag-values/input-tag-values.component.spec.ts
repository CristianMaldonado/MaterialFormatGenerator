import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTagValuesComponent } from './input-tag-values.component';

describe('InputTagValuesComponent', () => {
  let component: InputTagValuesComponent;
  let fixture: ComponentFixture<InputTagValuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputTagValuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTagValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
