import { CanActivate, Router, ActivatedRouteSnapshot, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { isEmpty } from '../utils/common-functions';
import { RequestService } from './request.service';
import { LocalStorage } from 'src/app/libs/localstorage';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authService: RequestService,
        private localStorage: LocalStorage,
        public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        // return this.authService.isAuthenticated();
        //  debugger;
        if (!this.authService.isAuthenticated()) {
            console.log('isAuthenticated', route);
            if (!isEmpty(route.queryParams)) {
                let data = {
                    url: route['_routerState']['url'].split("?")[0],
                    params: route.queryParams
                }
                this.localStorage.setObject('state', data);
            }
            localStorage.clear();
            // this.router.navigate(['pages/landing']);
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}
