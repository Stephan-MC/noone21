import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Location, LocationStrategy } from "@angular/common";
import { Router } from '@angular/router';
import { Config } from 'src/app/config/config';
import { LocalStorage } from 'src/app/libs/localstorage';
import { Observable, of } from 'rxjs';
import { makeParamsFromFormData } from '../utils/helpers';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationUrls } from 'src/app/pages/content-pages/authentication-urls.enum';
import { removeEmptyKeysFromObject, isEmptyObject, replaceKeySandValues } from '../utils/common-functions';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
const WIKI_URL = 'https://en.wikipedia.org/w/api.php';
const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*'
  }
});
@Injectable({
  providedIn: 'root'
})

// @Injectable()
export class RequestService {

  constructor(private httpClient: HttpClient,
    private config: Config,
    private _location: Location,
    private locationStrategy: LocationStrategy,
    private _router: Router,
    private toasterService: ToastrService,
    private localStorage: LocalStorage,
    public jwtHelper: JwtHelperService,

  ) {
    if(this.isUTokenExpired()){
      this.logoutTokenExpire();
    }if(!this.isUTokenExpired()){
      let now = new Date().getTime();
      let countDownDate = new Date(this.localStorage.get('exp')).getTime();
      if(countDownDate>1){
          let distance = countDownDate - now;
          let days = Math.floor(distance / (1000 * 60 * 60 * 24));
          let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          let seconds = Math.floor((distance % (1000 * 60)) / 1000);
          console.log('You Will Be Expired In (Rangyoul)'+days + "d " + hours + "h "
          + minutes + "m " + seconds + "s ");
       }
    }
   
    

  }

  search(term: string) {
    if (term === '') {
      return of([]);
    }

    return this.httpClient
      .get(WIKI_URL, { params: PARAMS.set('search', term) }).pipe(
        map(response => response[1])
      );
  }
  private makeUrl(url) {
    return this.config.getConfig('apiUrl') + url;
  }

  sendRequest(url, type, formData?): Observable<any> {
    const apiUrl = this.makeUrl(url);
    const params = makeParamsFromFormData(formData || {});
   const token=this.localStorage.getObject('user_details').active_jwt_token;
        const headerData = {
          headers: new HttpHeaders()
            .set('Authorization',  'Bearer ' + token)
        }
    switch (type.toLowerCase()) {
      case 'get':
        return this.httpClient.get(apiUrl, {params:params});
      case 'post':
        return this.httpClient.post(apiUrl, formData,headerData);
      case 'put':
        return this.httpClient.put(apiUrl, formData,headerData);
      case 'delete':
        return this.httpClient.delete(apiUrl, { params: params });
      case 'delete_with_body':
        const header: HttpHeaders = new HttpHeaders()
        const httpOptions = {
          headers: new HttpHeaders()
            .set('Authorization',  'Bearer ' + token),
          body: formData
        };
        return this.httpClient.delete(apiUrl, httpOptions);
      case 'post_file':
        return this.httpClient.post(apiUrl, formData, {
          reportProgress: true,
          observe: 'events'
        });
    }
  }


  getLocation(loc): Observable<any> {
    let url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + loc.lat + ',' + loc.lng + '&key= ' + this.config.getConfig('mapKey');
    // this.url = this.url+"?token="+this.getToken();

    return this.httpClient.get(url);
  }


  getToken() {
    return this.localStorage.get('token');
  }

  get(url, type, formData?) {
    return this.httpClient.get(url);
  }
logoutTokenExpire(){
  let email = this.localStorage.get('email');
  this.sendRequest(AuthenticationUrls.LOGOUT_GET, 'GET', { email: email, token: this.localStorage.get('token') }).subscribe(res => {
    if (res && res.status) {
      localStorage.clear();
      this.toasterService.success('Time out', 'success');
      // this.router.navigate(['pages/landing']);
      this._router.navigate(['/']);
    } else {
      this.toasterService.error(res.message, 'Error');
    }
  }, error => {
    localStorage.clear();
    this._router.navigate(['/']);
    this.toasterService.error(error.error ? error.error.message : error.message, 'Error');
  })
}
  addUrlQueryParams(params) {
    params = removeEmptyKeysFromObject(params);
    console.log(isEmptyObject(params));
    if (!isEmptyObject(params)) {
      params = replaceKeySandValues(params);
    }

    this._location.replaceState(
      this._router.createUrlTree([], {
        queryParams: params,
      }
      ).toString()
    );
  }




  getLoggedInUser() {
    return this.localStorage.getObject('user_details');
  }

  getLoggedUserRole() {
    let user = this.localStorage.getObject('user_details');
    if (user && !isEmptyObject(user)) {
      return user.role.id;
    }
    return '';
  }

  public isAuthenticated(): boolean {
    
    const token = this.localStorage.get('token');
    //const ifToken=this.jwtHelper.isTokenExpired(token);
    // Check whether the token is expired and return
    // true or false
    if (token) {
      return true;
      // return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }
  public isUTokenExpired():boolean{
    let now = new Date().getTime();
    let countDownDate = new Date(this.localStorage.get('exp')).getTime();
    let distance = countDownDate - now;
    if(countDownDate>2){
      if(distance<0){
        return true;
      }
    }
    return false;
  }
}

