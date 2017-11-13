import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerWithRangeModule } from '../date-picker-with-range/date-picker-with-range.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot(),
    DatePickerWithRangeModule
  ],
  declarations: [CourseDetailsComponent],
  exports: [CourseDetailsComponent]
})
export class CoursesModule { }

// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { CourseDetailsComponent } from './course-details/course-details.component';
// import { FormsModule } from '@angular/forms';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// // import { DatePickerWithRangeModule } from '../date-picker-with-range/date-picker-with-range.module';

// @NgModule({
//   imports: [
//     CommonModule,
//     FormsModule,
//     NgbModule.forRoot()
//     // DatePickerWithRangeModule
//   ],
//   declarations: [CourseDetailsComponent],
//   exports: [CourseDetailsComponent]
// })
// export class CoursesModule { }
