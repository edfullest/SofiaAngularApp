import { Component, OnInit, Injectable } from '@angular/core';
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


@Injectable()
export class DatePickerWithRangeService {
  private fromDate: NgbDateStruct;
  private toDate: NgbDateStruct;


  getFromDate() {
    return this.fromDate
  }

  getToDate() {
    return this.toDate
  }

  setFromDate(date : NgbDateStruct){
    this.fromDate = date
  }
  setToDate(date : NgbDateStruct){
    this.toDate = date
  }
}
@Component({
  selector: 'date-picker-with-range',
  templateUrl: './date-picker-with-range.component.html',
  styleUrls: ['./date-picker-with-range.component.css']
})

export class DatePickerWithRangeComponent implements OnInit{
  hoveredDate: NgbDateStruct;
  closeResult: string;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  modalRef: NgbModalRef;
  ngOnInit(){

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
    this.datePickerService.setFromDate(this.fromDate)
    this.datePickerService.setToDate(this.toDate)
    
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

  constructor(private modalService: NgbModal, public calendar: NgbCalendar, private datePickerService : DatePickerWithRangeService) {
    this.fromDate = calendar.getToday();
    // this.datePickerService.setFromDate(this.fromDate)
    // this.toDate = calendar.getNext(calendar.getToday(), 'd', 100);

  }

  open(content) {
    this.modalRef = this.modalService.open(content)
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

}
