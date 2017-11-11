import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalRef ,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { Angular2TokenService } from 'angular2-token';
import {Router, RouterModule} from '@angular/router';
import { User, UserDataService } from '../services/user-data.service';
import { RequestMethod } from '@angular/http';

@Component({
  selector: 'app-sofia-student',
  templateUrl: './sofia-student.component.html',
  styleUrls: ['./sofia-student.component.css']
})
export class SofiaStudentComponent implements OnInit {

  query : string;
  name : string;
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


  constructor(private modalService: NgbModal,
    private _tokenService: Angular2TokenService, private router: Router,
    private userService : UserDataService) {
    //this.fromDate = calendar.getToday();
    // this.toDate = calendar.getNext(calendar.getToday(), 'd', 100);

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
      this.router.navigate(['student/dashboard/profile']);
  }

  loadCourses(){
      this.router.navigate(['student/dashboard/courses']);
  }

  search(){
      this.router.navigate(['student/dashboard/results/' + this.query])
    
  }

  checkLogin(){
    if (this._tokenService.userSignedIn() == false){
      this.router.navigateByUrl('/home');
    }
  }

}
