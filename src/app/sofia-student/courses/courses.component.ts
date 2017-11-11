import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { CommonModule } from '@angular/common';
import * as $ from 'jquery';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  title : string = "Cursos"
  coursesRows : Array<Array<any>>;
  constructor(private _tokenService: Angular2TokenService) { 
    
  }

  unRegister(courseID){
	    this._tokenService.delete('/students/courses/' + courseID).subscribe(
	        res => {
	        },
	        error => console.log(error)

	    )
	    var courseRow, course, i, j;
	    i = 0;
	    for (i = 0; i < this.coursesRows.length; ++i){
	      for (j = 0; j < this.coursesRows[i].length; ++j){
	        if (this.coursesRows[i][j].id == courseID){
	          this.coursesRows[i].splice(j,1)
	        }
	      }
	      if (this.coursesRows[i].length == 0){
	        this.coursesRows.splice(i, 1);
	      }
	    }
    
  }


  return(course){
    var selector = "#course" + course.id;
    $('.col-lg-3').show();
    $('#card-block' + course.id).show()
    $(selector).attr('class','col-lg-3')
    $("#form" + course.id).attr('class','form invisible')
  }

  ngOnInit() {
    this._tokenService.init({
      apiBase: 'http://localhost:3000'
    });
    this.getCourses()
  }

  getCourses(){
    this._tokenService.request({
      method: "GET",
      url:    'http://localhost:3000/student/courses'
    })
    .subscribe(
        res =>  {
            var data = res.json()
            var i,j
            var chunk = 4;
            this.coursesRows = []
            for (i = 0; i < data.length; i += chunk) {
                var row = []
                for (j = i; j < i + chunk && j < data.length; ++j){
                    row.push(data[j])
                }
                this.coursesRows.push(row)
            }
            
        },
        error =>    console.log(error)
        );
  }

}
