import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { SofiaTeacherRoutingModule } from './sofia-teacher-routing.module';
import { SofiaTeacherComponent } from './sofia-teacher.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { CoursesComponent } from './courses/courses.component';
import { AssignmentsComponent } from './courses/assignments/assignments.component';
import { DatePickerWithRangeComponent } from '../date-picker-with-range/date-picker-with-range.component';
import { CoursesModule } from '../shared-components/courses.module';
import { QuestionsAnswersModule } from '../shared-components/questions-answers.module';
import { InputModule } from '../input.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    SofiaTeacherRoutingModule,
    CoursesModule,
    QuestionsAnswersModule,
    InputModule
  ],
  declarations: [DatePickerWithRangeComponent,SofiaTeacherComponent, ProfileComponent, CoursesComponent, AssignmentsComponent]
})
export class SofiaTeacherModule { 

}
