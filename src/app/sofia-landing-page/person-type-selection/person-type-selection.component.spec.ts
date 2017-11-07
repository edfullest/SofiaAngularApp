import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonTypeSelectionComponent } from './person-type-selection.component';

describe('PersonTypeSelectionComponent', () => {
  let component: PersonTypeSelectionComponent;
  let fixture: ComponentFixture<PersonTypeSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonTypeSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonTypeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
