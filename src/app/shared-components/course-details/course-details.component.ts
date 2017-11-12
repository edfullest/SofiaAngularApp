import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { ActivatedRoute } from '@angular/router';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  
  id: number;
  course : any;
  assignments : Array<any>;
  students : Array<any>;

  constructor(private _tokenService: Angular2TokenService, private route: ActivatedRoute) {
    this._tokenService.init({
      apiBase: 'http://localhost:3000'
    }); 
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number
       this.loadCourse()
       // In a real app: dispatch action to load the details here.
    });
  }

  loadCourse(){
    this._tokenService.get('courses/' + this.id).subscribe(
            res => {
              var data = res.json()
              this.course = data.course
              this.assignments = data.assignments
              this.students = data.students
            },
            error => console.log(error)
        );
  }

}
