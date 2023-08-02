import { Component, OnInit, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorage } from 'src/app/libs/localstorage';
import { AuthenticationUrls } from 'src/app/pages/content-pages/authentication-urls.enum';
import { GlobalService } from '../../services/global.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})



export class HeaderComponent implements OnInit {
  page = '';
  hd= false;
  mapcls=true;
  constructor(public requestService: RequestService,

    private toasterService: ToastrService,
    private localStorage: LocalStorage,
    private globalService: GlobalService,
    private router: Router) {
    this.globalService.routePage$.subscribe(res => {
      console.log("HeaderComponent -> res", res)
      this.page = res;
      let self = this;
      // headerToggle();
     
    })
  }



  horizontalnavtoggle(){
    
    document.body.classList.add("active");
  }




  ngOnInit(): void {
  
   }

  ngAfterViewInit(): void {

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
         document.body.scrollTop = 0;
      }
   });

  setTimeout(() => {
    this.mapcls=false;
  }, 7000);
    
  }


  ngOnChanges(changes: SimpleChanges): void { }

  delclass(){
    document.body.classList.remove("active");
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

    document.body.classList.remove("active");
  }
  gotoDashboard() {
    let user = this.localStorage.getObject('user_details');
    if (user.role.id == 4) {
      this.router.navigate(['dashboard/vendor']);
    }
    if (user.role.id == 3) {
      this.router.navigate(['dashboard/buyer']);
    }
    if (user.role.id == 1) {
      this.router.navigate(['dashboard/admin']);
    }
    document.body.classList.remove("active");
  }


  ifInRoute(str) {
    if (<any>this.page.includes(str)) {
      return false
    }
    return true
  }
}
