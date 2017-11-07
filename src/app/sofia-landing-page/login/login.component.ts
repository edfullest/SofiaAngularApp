import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import * as $ from 'jquery';
import {Router} from '@angular/router';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    name = {
        first : "works"
    }
    password : string;
    constructor(private _tokenService: Angular2TokenService, private router: Router) {
        this._tokenService.init({
            apiBase: 'http://localhost:3000'
            });
        this.router = router;
    }

    ngOnInit() {
        if (this._tokenService.userSignedIn() == true){
            this.router.navigateByUrl('/teacher/dashboard');
        }
    }

    activateButton(){

        $('#registerButtonStudent').removeClass('active');
        $('#registerButtonTeacher').removeClass('active');
        if ($('#loginButton').attr('class') == 'btn btn-outline-primary active'){
            $('#loginButton').removeClass('active');
        }
        else{
            $('#loginButton').addClass('active');
        }  
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
                console.log(data)
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