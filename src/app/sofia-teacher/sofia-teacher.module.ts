import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SofiaTeacherRoutingModule } from './sofia-teacher-routing.module';
import { SofiaTeacherComponent } from './sofia-teacher.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { CoursesComponent } from './courses/courses.component';
import { AssignmentsComponent } from './courses/assignments/assignments.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot(),
    SofiaTeacherRoutingModule
  ],
  declarations: [SofiaTeacherComponent, ProfileComponent, CoursesComponent, AssignmentsComponent]
})
export class SofiaTeacherModule { 

}
