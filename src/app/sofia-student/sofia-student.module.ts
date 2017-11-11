import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { SofiaStudentComponent } from './sofia-student.component';
import { ProfileComponent } from './profile/profile.component';
import { CoursesComponent } from './courses/courses.component';
import { SearchEngineComponent } from './search-engine/search-engine.component';
import { SofiaStudentRoutingModule } from './sofia-student-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SofiaStudentRoutingModule
  ],
  declarations: [SearchEngineComponent, SofiaStudentComponent, ProfileComponent, CoursesComponent]
})
export class SofiaStudentModule { }
