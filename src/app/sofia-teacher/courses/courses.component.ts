import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { CommonModule } from '@angular/common';
import * as $ from 'jquery';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { DatePickerWithRangeService } from '../../date-picker-with-range/date-picker-with-range.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  title : string = "Cursos"
  coursesRows : Array<Array<any>>;
  constructor(private _tokenService: Angular2TokenService, private datePickerService : DatePickerWithRangeService) { 
    console.log(this.datePickerService.getFromDate())
  }

  deleteCourse(courseID){
    console.log(courseID)
    this._tokenService.delete('/courses/' + courseID).subscribe(
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

  editCourse(target, courseID){
    this.title = "Editar curso"
    var selector = "#course" + courseID;
    $('.col-lg-3:not('+ selector +')').hide();
    $('#card-block' + courseID).hide()
    $(selector).attr('class','col-lg-12')
    $("#form" + courseID).attr('class','form visible')
    $('html, body').animate({
        scrollTop: ($(selector).offset().top)
    },500);

  }

  acceptChanges(course){
      var fromDate : NgbDateStruct = this.datePickerService.getFromDate()
      var toDate : NgbDateStruct = this.datePickerService.getToDate()
      var startDate = fromDate.year + "-" + fromDate.month + "-" + fromDate.day
      var endDate = toDate.year + "-" + toDate.month + "-" + toDate.day

      course.start_date = startDate
      course.end_date = endDate
      var data = {
        "start_date" : course.start_date,
        "name" : course.name,
        "end_date" : course.end_date
      }
      this._tokenService.request({
        method: "PUT",
        url:    'http://localhost:3000/courses/' + course.id,
        body:   data
      });
      this.return(course)
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
      url:    'http://localhost:3000/teachers/courses'
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
