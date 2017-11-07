import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SofiaTeacherComponent } from './sofia-teacher.component';
import { FormsModule } from '@angular/forms';

import { ProfileComponent } from './profile/profile.component';
import { CoursesComponent } from './courses/courses.component';
import { AssignmentsComponent } from './courses/assignments/assignments.component';

const routes: Routes = [
  { path: '', 
    component: SofiaTeacherComponent, 
    children: [
      { path: 'courses', component: CoursesComponent },
      { path: 'profile', component: ProfileComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule],
  exports: [RouterModule]
})
export class SofiaTeacherRoutingModule { }
