import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalRef ,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { Angular2TokenService } from 'angular2-token';
import {Router, RouterModule} from '@angular/router';
import { User, UserDataService } from '../services/user-data.service';
import { RequestMethod } from '@angular/http';

import * as $ from 'jquery';

const now = new Date();
const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

@Component({
  selector: 'app-sofia-teacher',
  templateUrl: './sofia-teacher.component.html',
  styleUrls: ['./sofia-teacher.component.css']
})
export class SofiaTeacherComponent implements OnInit{
  name : string;
  courseName: string;
  closeResult: string;
  hoveredDate: NgbDateStruct;

  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  modalRef: NgbModalRef;
  ngOnInit(){
    var user : User = this.userService.getCurrentUser()
    if (this._tokenService.userSignedIn() == false){
      this.router.navigateByUrl('/home');
    }
    else{
      this.name = user.firstName
    }
  }
  onDateChange(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

  constructor(private modalService: NgbModal, public calendar: NgbCalendar, 
    private _tokenService: Angular2TokenService, private router: Router,
    private userService : UserDataService) {
    this.fromDate = calendar.getToday();
    // this.toDate = calendar.getNext(calendar.getToday(), 'd', 100);

  }

  open(content) {
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });    
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  logout(){
    this._tokenService.signOut().subscribe(
      res =>      console.log(res),
      error =>    console.log(error)
    );
    this.router.navigateByUrl('/home');
    this.userService.deleteCurrentUserData()
    console.log(this.userService.getCurrentUser())
  }

  loadProfile(){
      this.router.navigate(['teacher/dashboard/profile']);
  }

  loadCourses(){
      this.router.navigate(['']);
  }

  checkLogin(){
    if (this._tokenService.userSignedIn() == false){
      this.router.navigateByUrl('/home');
    }
  }

  createCourse(){
    this.modalRef.close()
    var data = {
      "start_date" : this.fromDate.day+"/"+this.fromDate.month+"/"+this.fromDate.year,
      "name" : this.courseName,
      "end_date" : this.toDate.day+"/"+this.toDate.month+"/"+this.toDate.year
    }
    this._tokenService.request({
      method: "POST",
      url:    'http://localhost:3000/courses',
      body:   data
    }).subscribe(
      res => this.router.navigate(['']),
      error => this.router.navigate([''])
    );
    
  }

}
