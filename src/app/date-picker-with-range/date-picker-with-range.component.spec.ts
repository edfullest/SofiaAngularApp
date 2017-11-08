import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerWithRangeComponent } from './date-picker-with-range.component';

describe('DatePickerWithRangeComponent', () => {
  let component: DatePickerWithRangeComponent;
  let fixture: ComponentFixture<DatePickerWithRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatePickerWithRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerWithRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
