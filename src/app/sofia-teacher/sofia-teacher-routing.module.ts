import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SofiaTeacherComponent } from './sofia-teacher.component';
import { FormsModule } from '@angular/forms';

import { ProfileComponent } from './profile/profile.component';
import { CoursesComponent } from './courses/courses.component';
import { AssignmentsComponent } from './courses/assignments/assignments.component';
import { DatePickerWithRangeComponent } from '../date-picker-with-range/date-picker-with-range.component';
import { CoursesModule } from '../shared-components/courses.module';
import { CourseDetailsComponent } from '../shared-components/course-details/course-details.component';

const routes: Routes = [
  { path: '', 
    component: SofiaTeacherComponent, 
    children: [
      { path: 'courses', component: CoursesComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'course/:id', component: CourseDetailsComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule],
  exports: [RouterModule]
})
export class SofiaTeacherRoutingModule { }
