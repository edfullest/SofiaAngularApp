import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';
import { RouterModule, Routes } from '@angular/router';

import { ClosePopoverOnOutsideClickDirective } from './close-popover.directive';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './sofia-landing-page/login/login.component';
import { RegisterComponent } from './sofia-landing-page/register/register.component';
import { SofiaLandingPageComponent } from './sofia-landing-page/sofia-landing-page.component'

import { AppRoutingModule }        from './app-routing.module';
import { AuthGuard } from './auth-guard.service';
import { PersonTypeSelectionComponent } from './sofia-landing-page/person-type-selection/person-type-selection.component';
import { User, UserDataService } from './services/user-data.service';
import { DatePickerWithRangeService,DatePickerWithRangeComponent } from './date-picker-with-range/date-picker-with-range.component';
// import { SofiaStudentComponent } from './sofia-student/sofia-student.component';
// import { ProfileComponent } from './sofia-student/profile/profile.component';
// import { CoursesComponent } from './sofia-student/courses/courses.component';

@NgModule({
  declarations: [
    AppComponent,
    ClosePopoverOnOutsideClickDirective,
    LoginComponent,
    RegisterComponent,
    SofiaLandingPageComponent,
    PersonTypeSelectionComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [Angular2TokenService, AuthGuard, UserDataService, DatePickerWithRangeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
