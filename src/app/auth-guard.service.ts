import { CanLoad, Router, Route, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';


@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private _tokenService: Angular2TokenService,private router: Router) {
        this._tokenService.init({
            apiBase: 'http://localhost:3000'
            });
    }
  canLoad(route: Route): boolean {
    if (this._tokenService.userSignedIn() == false){
        this.router.navigateByUrl('/home');
    }
    return this._tokenService.userSignedIn();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this._tokenService.userSignedIn();
  }
}
