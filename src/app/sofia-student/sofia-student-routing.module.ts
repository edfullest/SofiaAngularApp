import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SofiaStudentComponent } from './sofia-student.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { CoursesComponent } from './courses/courses.component';
import { SearchEngineComponent } from './search-engine/search-engine.component';

const routes: Routes = [
	{ path: '', 
    component: SofiaStudentComponent, 
    children: [
      { path: 'courses', component: CoursesComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'results/:query', component: SearchEngineComponent },
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SofiaStudentRoutingModule { }
