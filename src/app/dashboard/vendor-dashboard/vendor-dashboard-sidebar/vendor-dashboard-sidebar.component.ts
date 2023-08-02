import { Component, OnInit } from '@angular/core';
import { LocalStorage } from 'src/app/libs/localstorage';
import { GlobalService } from 'src/app/shared/services/global.service';
import { isEmptyObject } from 'src/app/shared/utils/common-functions';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'src/app/shared/services/request.service';
import { AuthenticationUrls } from 'src/app/pages/content-pages/authentication-urls.enum';

@Component({
  selector: 'app-vendor-dashboard-sidebar',
  templateUrl: './vendor-dashboard-sidebar.component.html',
  styleUrls: ['./vendor-dashboard-sidebar.component.scss']
})
export class VendorDashboardSidebarComponent implements OnInit {

  user: any;
  togd= false;
  constructor(private localStorage: LocalStorage, private globalService: GlobalService,
    private toasterService: ToastrService,
    private requestService: RequestService,
    public router: Router) {
    this.user = this.localStorage.getObject('user_details');

    this.globalService.userUpdate$.subscribe(user => {
      console.log("DoctorDashboardSidebarComponent -> constructor -> user", user)
      if (user && !isEmptyObject(user)) {
        this.user = user;
      }
    })
    
  }

  ngOnInit(): void {
  }

  togdashbtn(){
    this.togd = !this.togd;
  }

  removedashclass(){
    document.querySelector(".dashsidebar").classList.remove("active");
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
    document.querySelector(".dashsidebar").classList.remove("active");
  }

  

}
