import { Component, OnInit } from '@angular/core';
import { LocalStorage } from 'src/app/libs/localstorage';
import { RequestService } from '../../services/request.service';
import { LooseObject } from '../../utils/common-functions';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-full-content-header',
  templateUrl: './full-content-header.component.html',
  styleUrls: ['./full-content-header.component.scss']
})
export class FullContentHeaderComponent implements OnInit {
  page = '';
  mapcls = true;
  userRole = null;
  user: LooseObject = {};
  constructor(public localStorage: LocalStorage, public requestService: RequestService, public router: Router,) {
    console.log("FullContentHeaderComponent");
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log("FullLayoutComponent -> constructor -> event", event)
        this.router.events.subscribe(evt => {
          if (!(evt instanceof NavigationEnd)) {
            return;
          }
          window.scrollTo(0, 0);
        });
        this.page = event['urlAfterRedirects'];
        console.log("FullContentHeaderComponent -> constructor -> this.page", this.page)
      }
    });
  }

  ngOnInit(): void {
   
    this.user = this.localStorage.getObject('user_details');
    if (this.user) {
      this.userRole = this.localStorage.getObject('user_details').role;
    }
  }

  ngAfterViewInit(): void {

  setTimeout(() => {
    this.mapcls=false;
  }, 7000);
    
  }

  ifInRoute(str) {
    if (<any>this.page.includes(str)) {
      return true
    }
    return false
  }

}
