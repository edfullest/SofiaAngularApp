import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { ActivatedRoute } from '@angular/router';
import { NgModel } from '@angular/forms';
import {NgbModal, NgbModalRef ,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { DatePickerWithRangeService } from '../../date-picker-with-range/date-picker-with-range.component';

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

  constructor(private _tokenService: Angular2TokenService, 
              private route: ActivatedRoute,
              private datePickerService : DatePickerWithRangeService) {
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

  editAssignment(target, assignment){

    var startDate = new Date(assignment.start_date);
    var endDate = new Date(assignment.end_date);

    var ngbDateStruct = { day: startDate.getUTCDate(), month: startDate.getUTCMonth() + 1, year: startDate.getUTCFullYear()};
    var ngbEndDate = { day: endDate.getUTCDate(), month: endDate.getUTCMonth() + 1, year: endDate.getUTCFullYear()};

    this.datePickerService.setFromDate(ngbDateStruct)
    this.datePickerService.setToDate(ngbEndDate)

    var selector = "#assignment" + assignment.id;
    $('.card:not('+ selector +')').hide();
    $('#card-block' + assignment.id).hide()
    // $(selector).attr('class',selector + ' visible')
    $("#form" + assignment.id).attr('class','form visible')
    $('html, body').animate({
        scrollTop: ($(selector).offset().top)
    },500);
  }

  acceptChanges(assignment){
    var fromDate : NgbDateStruct = this.datePickerService.getFromDate()
    var toDate : NgbDateStruct = this.datePickerService.getToDate()
    var startDate = fromDate.year + "-" + fromDate.month + "-" + fromDate.day
    var endDate = toDate.year + "-" + toDate.month + "-" + toDate.day

    assignment.start_date = startDate
    assignment.end_date = endDate
    var data = {
      "start_date" : assignment.start_date,
      "name" : assignment.name,
      "end_date" : assignment.end_date
    }
    this._tokenService.request({
      method: "PUT",
      url:    'http://localhost:3000/assignments/' + assignment.id,
      body:   data
    });
    this.return(assignment)
  }

  return(assignment){
    var selector = "#course" + assignment.id;
    $('.card').show();
    $('#card-block' + assignment.id).show()
    $("#form" + assignment.id).attr('class','form invisible')
  }

  deleteAssignment(assignment){
    this._tokenService.delete('assignments/' + assignment.id).subscribe(
        res => {
        },
        error => console.log(error)
    )
    for (var i = 0; i < this.assignments.length; ++i){
      if (this.assignments[i].id == assignment.id){
        this.assignments.splice(i,1)
      }
    }
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
