import { Component, OnInit, ViewChild } from '@angular/core';
import { BreadcrumbComponent } from 'src/app/breadcrumb/breadcrumb.module';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnInit {
  @ViewChild('breadCrumb', { static: false }) breadcumb: BreadcrumbComponent;
  title = "";
  showBreadCrumb = true;
  constructor(public router: Router,) {
    console.log('this.page = this.router.url;', this.router.url);
    // if (this.router.url == "/pages/landing") {
    if (this.router.url == "/") {
      this.showBreadCrumb = false;
    } else {
      this.showBreadCrumb = true;
    }
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('test');
        let title: string = this.getTitle(router.routerState, router.routerState.root).join(',');
        let titleStringFullView: string[] = title.split(",");
        console.log('title', titleStringFullView.filter(Boolean).slice(-1)[0]);
        this.title = titleStringFullView.filter(Boolean).slice(-1)[0];
      
      }
    });

  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    if (this.breadcumb) {
      this.breadcumb.ngOnChanges(new Object());
    }
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
}
