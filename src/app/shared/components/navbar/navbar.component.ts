import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../services/global.service';
import { AuthenticationUrls } from 'src/app/pages/content-pages/authentication-urls.enum';
import { LocalStorage } from 'src/app/libs/localstorage';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  subscription: Subscription[] = [];
  countries = [];
  constructor(public requestService: RequestService,
    private globalService: GlobalService,
    private localStorage: LocalStorage,
    private toasterService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    // this.getCountries();
  }

  getCountries() {
    return ;
    // this.requestService.get('assets/data/countries.json', 'get', {}).subscribe((res: any) => {
    //   // console.log("NavbarComponent -> getCountries -> res", res)
    //   this.countries = res;
    //   this.globalService.countries$.next(this.countries);
    //   // $.getScript("assets/js/select2.js");
    // }, error => {
    //   console.log("NavbarComponent -> getCountries -> error", error)

    // })
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
      localStorage.clear();
      // this.toasterService.success(res.message, 'success');
      // this.router.navigate(['pages/landing']);
      this.router.navigate(['/']);
      this.toasterService.error(error.error ? error.error.message : error.message, 'Error');
    })
  }
}