import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class User {
  constructor(public id: number, public firstName: string, public lastName : string,
              public type: string, public email: string) { }
}


@Injectable()
export class UserDataService {

  private currentUser: User;

  getCurrentUser() {
    var storedUser = JSON.parse(localStorage.getItem("currentUser"));
    return storedUser; 
  }

  setCurrentUser(id: number,name: string,lastName : string,
                type: string,email: string) {
    this.currentUser = new User(id,name,lastName,type,email);
    localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
  }

  deleteCurrentUserData(){
    localStorage.setItem("currentUser", "");
    localStorage.clear();
  }
}