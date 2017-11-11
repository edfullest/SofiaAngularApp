import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Angular2TokenService } from 'angular2-token';
import { User, UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
   firstName : string;
   lastName : string;
   email : string;

   constructor(private _tokenService: Angular2TokenService, private userService : UserDataService) {
     this._tokenService.init({
            apiBase: 'http://localhost:3000'
            });
    }

  ngOnInit() {
    // this.loadProfile()
    var user : User = this.userService.getCurrentUser()
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email
  }

   loadProfile(){
        
        this._tokenService.get('people/profile').subscribe(
            res => {
              var data = res.json()
              var user = data.data
              this.firstName = user.name
              this.lastName = user.last_name
              this.email = user.email
              console.log(res.json())

            },
            error => console.log(error)
        );
  }

}
