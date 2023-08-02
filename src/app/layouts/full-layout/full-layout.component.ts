import { Component, OnInit, ViewChild } from '@angular/core';
import { BreadcrumbComponent } from 'src/app/breadcrumb/breadcrumb.module';
import { NavigationEnd, Router } from '@angular/router';
import { LocalStorage } from 'src/app/libs/localstorage';
import { RequestService } from 'src/app/shared/services/request.service';
import * as moment from 'moment';
import { GlobalService } from 'src/app/shared/services/global.service';
@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})
export class FullLayoutComponent implements OnInit {

  @ViewChild('breadCrumb', { static: false }) breadcumb: BreadcrumbComponent;
  title = "";
  user = null;
  showBreadCrumb = true;
  moment = moment;
  page = '';

  constructor(public router: Router, private localStorage: LocalStorage,
    public requestService: RequestService,
    public globalService: GlobalService) {
    if (this.router.url == "/") {
      this.showBreadCrumb = false;
    } else {
      this.showBreadCrumb = true;
    }
    this.user = this.localStorage.getObject('user_details');
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
        this.globalService.routePage$.next(this.router.url);
        this.user = this.localStorage.getObject('user_details');
        console.log('test');
        let title: string = this.getTitle(router.routerState, router.routerState.root).join(',');
        let titleStringFullView: string[] = title.split(",");
        console.log('title', titleStringFullView.filter(Boolean).slice(-1)[0]);
        if (titleStringFullView.filter(Boolean).slice(-1)[0] == "Doctor Profile") {

          document.body.classList.add("adminlog");
       } else {
          
          document.body.classList.remove("adminlog");
       }
        this.title = titleStringFullView.filter(Boolean).slice(-1)[0];

      }
    });

  }


  ngOnInit(): void { }

  ngAfterViewInit() {
    if (this.breadcumb) {
      this.breadcumb.ngOnChanges(new Object());
    }
    this.getCountries();
  }

  getCountries() {
    return ;
    this.requestService.get('assets/data/countries.json', 'get', {}).subscribe((res: any) => {
      // console.log("NavbarComponent -> getCountries -> res", res)
      // this.countries = res;
      this.globalService.countries$.next(res);
      // $.getScript("assets/js/select2.js");
    }, error => {
      console.log("NavbarComponent -> getCountries -> error", error)

    })
  }


  getTitle(state, parent) {
    var data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      let value = this.getTitle(state, state.firstChild(parent));
      data.push(this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  ifInRoute(str) {
    if (<any>this.page.includes(str)) {
      return false
    }
    return true
  }
}
