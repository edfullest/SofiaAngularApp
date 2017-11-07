import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { Angular2TokenService } from 'angular2-token';
import {Router, RouterModule} from '@angular/router';
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

  ngOnInit(){
    this.getProfileFromApi()
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
    private _tokenService: Angular2TokenService, private router: Router) {
    this.fromDate = calendar.getToday();
    // this.toDate = calendar.getNext(calendar.getToday(), 'd', 100);

  }

  open(content) {
    
    this.modalService.open(content).result.then((result) => {
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
  }

  loadProfile(){
      this.router.navigate(['teacher/dashboard/profile']);
  }

  loadCourses(){
      this.router.navigate(['teacher/dashboard/courses']);
  }

  getProfileFromApi(){
    this._tokenService.get('people/profile').subscribe(
            res => {
              var data = res.json()
              this.name = data.data.name
              console.log(res.json())

            },
            error => console.log(error)
        );
  }

  checkLogin(){
    if (this._tokenService.userSignedIn() == false){
      this.router.navigateByUrl('/home');
    }
  }

}
