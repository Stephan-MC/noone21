import { Component, OnInit } from '@angular/core';
import { LocalStorage } from 'src/app/libs/localstorage';
import { isEmptyObject } from 'src/app/shared/utils/common-functions';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'src/app/shared/services/request.service';
import { AuthenticationUrls } from 'src/app/pages/content-pages/authentication-urls.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-dashboard-sidebar',
  templateUrl: './patient-dashboard-sidebar.component.html',
  styleUrls: ['./patient-dashboard-sidebar.component.scss']
})
export class PatientDashboardSidebarComponent implements OnInit {

  user: any;
  constructor(private localStorage: LocalStorage, private globalService: GlobalService,
    private toasterService: ToastrService,
    private requestService: RequestService,
    public router: Router) {
    this.user = this.localStorage.getObject('user_details');
    this.globalService.userUpdate$.subscribe(user => {
      if (user && !isEmptyObject(user)) {
        this.user = user;
      }
    })
  }

  ngOnInit(): void {
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
