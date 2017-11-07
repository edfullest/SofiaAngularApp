import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SofiaLandingPageComponent } from './sofia-landing-page.component';

describe('SofiaLandingPageComponent', () => {
  let component: SofiaLandingPageComponent;
  let fixture: ComponentFixture<SofiaLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SofiaLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SofiaLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
