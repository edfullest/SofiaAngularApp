import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SofiaStudentComponent } from './sofia-student.component';

describe('SofiaStudentComponent', () => {
  let component: SofiaStudentComponent;
  let fixture: ComponentFixture<SofiaStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SofiaStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SofiaStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
