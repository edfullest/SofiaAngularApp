import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import * as $ from 'jquery';
import {Router} from '@angular/router';
import { User, UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    password : string;
    constructor(private _tokenService: Angular2TokenService, private router: Router, 
               private userService : UserDataService ) {
        this._tokenService.init({
            apiBase: 'http://localhost:3000'
            });
        this.router = router;
    }

    ngOnInit() {
        if (this._tokenService.userSignedIn() == true){
            this.router.navigateByUrl('/teacher/dashboard/courses');
        }
    }

    activateButton(){
        $('#registerButtonStudent').removeClass('active');
        $('#registerButtonTeacher').removeClass('active');
        $('#loginButton').addClass('active'); 
    }

    deactivateButton(){
        $('#loginButton').removeClass('active'); 
    }

    sendLoginData(){
        var password = $("#loginPassword").val()
        var email = $("#loginEmail").val()
        this._tokenService.signIn({
            email:    email,
            password: password
        })
        .subscribe(
            res =>  {
                var data = res.json()
                this.userService.setCurrentUser(data.data.id,data.data.name,data.data.last_name,
                data.type,data.data.email)
                console.log(this.userService.getCurrentUser())

                if (data.type == 'Student'){

                }
                else if (data.type == 'Teacher'){
                    this.router.navigateByUrl('/teacher/dashboard/courses');
                }
                else{
                    this._tokenService.signOut()
                    this.router.navigateByUrl('/home');
                }
                
            },
            error =>    console.log(error)
        );
    }

}