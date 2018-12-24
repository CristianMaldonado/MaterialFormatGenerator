import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VjsonComponent } from './vjson.component';

describe('VjsonComponent', () => {
  let component: VjsonComponent;
  let fixture: ComponentFixture<VjsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VjsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VjsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
