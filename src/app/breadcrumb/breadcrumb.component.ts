import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';
import { FindIndexFromSimpleArray } from '../shared/utils/common-functions';
import { RequestService } from '../shared/services/request.service';

/**
 * This component shows a breadcrumb trail for available routes the router can navigate to.
 * It subscribes to the router in order to update the breadcrumb trail as you navigate to a component.
 */
@Component({
    selector: 'breadcrumb',
    template: `
        <ul [class.breadcrumb]="useBootstrap">
            <li *ngFor="let url of _urls; let last = last" [ngClass]="{'breadcrumb-item': useBootstrap, 'active': last}"> <!-- disable link of last item -->
                <a role="button" *ngIf="!last && url == prefix" (click)="navigateTo('/')">{{url}}</a>
                <a role="button" *ngIf="!last && url != prefix" (click)="navigateTo(url)">{{friendlyName(url)}}</a>
                <span *ngIf="last">{{friendlyName(url)}}</span>
                <span *ngIf="last && url == prefix">{{friendlyName('/')}}</span>
            </li>
        </ul>
    `
})
export class BreadcrumbComponent implements OnInit, OnChanges {
    @Input() useBootstrap: boolean = true;
    @Input() prefix: string = '';
    @Input() queryParamsNeeded: boolean = true;
    notToRouteUrls = ['edit'];
    public _urls: string[];
    public _routerSubscription: any;

    constructor(
        private router: Router,
        private breadcrumbService: BreadcrumbService,
        private requestService: RequestService
    ) { }

    ngOnInit(): void {
        this._urls = new Array();

        if (this.prefix.length > 0) {
            this._urls.unshift(this.prefix);
        }

        this._routerSubscription = this.router.events.subscribe((navigationEnd: NavigationEnd) => {

            if (navigationEnd instanceof NavigationEnd) {
                this._urls.length = 0; //Fastest way to clear out array
                this.generateBreadcrumbTrail(navigationEnd.urlAfterRedirects ? navigationEnd.urlAfterRedirects : navigationEnd.url);
            }
        });
    }

    ngOnChanges(changes: any): void {
        if (!this._urls) {
            return;
        }

        this._urls.length = 0;
        this.generateBreadcrumbTrail(this.router.url);
    }

    generateBreadcrumbTrail(url: string): void {
        if (!this.queryParamsNeeded) {
            url = url.split("?")[0];
        }
        if (!this.breadcrumbService.isRouteHidden(url)) {
            //Add url to beginning of array (since the url is being recursively broken down from full url to its parent)
            this._urls.unshift(url);
        }

        if (url.lastIndexOf('/') > 0) {
            this.generateBreadcrumbTrail(url.substr(0, url.lastIndexOf('/'))); //Find last '/' and add everything before it as a parent route
        } else if (this.prefix.length > 0) {
            this._urls.unshift(this.prefix);
        }
    }

    navigateTo(url: string): void {
        console.log("BreadcrumbComponent -> navigateTo -> url", url, this.breadcrumbService.getFriendlyNameForRoute(url));
        let urls = url.split('/');
        if (urls && urls.length > 0 && FindIndexFromSimpleArray(this.notToRouteUrls, urls[urls.length - 1]) != -1) {
            return;
        }
        if (this.breadcrumbService.getFriendlyNameForRoute(url) == 'dashboard') {
            let loggedInUserRole = this.requestService.getLoggedInUser() ? this.requestService.getLoggedInUser().role.id : null;
            if (loggedInUserRole == 1) {
                url = url + '/admin';
            }
            if (loggedInUserRole == 3) {
                url = url + '/patient';
            }
            if (loggedInUserRole == 4) {
                url = url + '/doctor';
            }
        }
        // this.router.navigateByUrl(url);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([url]);
        })

    }

    friendlyName(url: string): string {
        return !url ? '' : this.breadcrumbService.getFriendlyNameForRoute(url);
    }

    ngOnDestroy(): void {
        if (this._routerSubscription) {
            this._routerSubscription.unsubscribe();
        }
    }

}
