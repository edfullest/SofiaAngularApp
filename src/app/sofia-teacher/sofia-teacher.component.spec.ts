import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SofiaTeacherComponent } from './sofia-teacher.component';

describe('SofiaTeacherComponent', () => {
  let component: SofiaTeacherComponent;
  let fixture: ComponentFixture<SofiaTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SofiaTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SofiaTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
