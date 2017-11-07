import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Angular2TokenService } from 'angular2-token';
import { NgModel } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstName : string;
  lastName : string;
  email : string;
  password : string;
  passwordRepeat : string;
  type: string;
  constructor(private _tokenService: Angular2TokenService, private router: Router) {
      this._tokenService.init({
          apiBase: 'http://localhost:3000'
      });
  }

  ngOnInit() {
    
  }
  sendRequest(){
    this._tokenService.registerAccount({
        email:                this.email,
        password:             this.password,
        passwordConfirmation: this.passwordRepeat,
        name: this.firstName,
        last_name: this.lastName,
        type : this.type
    }).subscribe(
        res =>      {
          if (this.type == 'Student'){

          }
          else{
            this.router.navigateByUrl('/teacher/dashboard/courses');
          }
        },
        error =>    console.log(error)
    );
  }
  activateStudentButton(){
        this.type = "Student"
        $('#loginButton').removeClass('active');
        $('#registerButtonTeacher').removeClass('active');
        if ($('#registerButtonStudent').attr('class') == 'btn btn-outline-primary active'){
            $('#registerButtonStudent').removeClass('active');
        }
        else{
            $('#registerButtonStudent').addClass('active');
        }
    }

  activateTeacherButton(){
        this.type = "Teacher"
        $('#loginButton').removeClass('active');
        $('#registerButtonStudent').removeClass('active');
        if ($('#registerButtonTeacher').attr('class') == 'btn btn-outline-primary active'){
            $('#registerButtonTeacher').removeClass('active');
        }
        else{
            $('#registerButtonTeacher').addClass('active');
        }
    }

  

}
