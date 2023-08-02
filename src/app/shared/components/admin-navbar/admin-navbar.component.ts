import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestService } from '../../services/request.service';
import { GlobalService } from '../../services/global.service';
import { LocalStorage } from 'src/app/libs/localstorage';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthenticationUrls } from 'src/app/pages/content-pages/authentication-urls.enum';
import { LooseObject, isEmptyObject } from '../../utils/common-functions';
@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {
  selectedItem = false;
  selectedItema = false;
  selectedItemb = false;
  searchicon = false;
  subscription: Subscription[] = [];
  countries = [];
  isEmptyObject = isEmptyObject;
  user: LooseObject = {};
  constructor(public requestService: RequestService,
    private globalService: GlobalService,
    private localStorage: LocalStorage,
    private toasterService: ToastrService,
    private router: Router
  ) {

    this.user = this.localStorage.getObject('user_details');
    console.log("AdminHeaderComponent -> constructor -> this.user", this.user);
  }

  ngOnInit(): void {
    this.getCountries();
  }

  appsidebar(){
    document.body.classList.toggle("sidenav-toggled");
  }



  getCountries() {
    return ;
    this.requestService.get('assets/data/countries.json', 'get', {}).subscribe((res: any) => {
      // console.log("NavbarComponent -> getCountries -> res", res)
      this.countries = res;
      this.globalService.countries$.next(this.countries);
      // $.getScript("assets/js/select2.js");
    }, error => {
      console.log("NavbarComponent -> getCountries -> error", error)

    })
  }

  sidedropdown(){
    this.selectedItem = !this.selectedItem;
  }  
  
  sidedropdowna(){
    this.selectedItema = !this.selectedItema;
  }  
  
  sidedropdownb(){
    this.selectedItemb = !this.selectedItemb;
  }  
  
  headernavsearch(){
    document.body.classList.toggle("search-show");
  } 
  
  delsearchicon(){
    document.body.classList.remove("search-show");
  }

  onLogout() {
    let email = this.localStorage.get('email');
    this.requestService.sendRequest(AuthenticationUrls.LOGOUT_GET, 'GET', { email: email, token: this.localStorage.get('token') }).subscribe(res => {
      if (res && res.status) {
        localStorage.clear();
        this.toasterService.success(res.message, 'success');
        // this.router.navigate(['pages/landing']);
        this.router.navigate(['/']);
      } else {
        this.toasterService.error(res.message, 'Error');
      }
    }, error => {
      this.toasterService.error(error.error ? error.error.message : error.message, 'Error');
    })
  }

}
