import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { LocalStorage } from 'src/app/libs/localstorage';
import { Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService {

  constructor(
    private authService: RequestService,
    private localStorage: LocalStorage,
    public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // return this.authService.isAuthenticated();
    //  debugger;
    if (this.authService.isAuthenticated()) {
      // this.router.navigate(['pages/landing']);
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
