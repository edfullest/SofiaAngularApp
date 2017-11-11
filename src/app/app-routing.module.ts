import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SofiaLandingPageComponent } from './sofia-landing-page/sofia-landing-page.component';
// import { SofiaTeacherAppComponent } from './sofia-teacher/sofia-teacher.component';
import { AuthGuard } from './auth-guard.service';

const appRoutes: Routes = [
  {
    path: 'teacher/dashboard',
    loadChildren: 'app/sofia-teacher/sofia-teacher.module#SofiaTeacherModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'student/dashboard',
    loadChildren:'app/sofia-student/sofia-student.module#SofiaStudentModule',
    canLoad: [AuthGuard]
  },
  // { path: 'teacher/dashboard', component: SofiaTeacherComponent },
  { path: '', component: SofiaLandingPageComponent },
  { path: 'home', component: SofiaLandingPageComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class AppRoutingModule { }
