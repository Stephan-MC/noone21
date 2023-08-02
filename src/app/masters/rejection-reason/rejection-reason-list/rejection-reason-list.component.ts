import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestService } from 'src/app/shared/services/request.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { NgPopupsService } from 'ng-popups';
import { RejectionReasonUrls } from '../rejection-reason-urls.enum';

@Component({
  selector: 'app-rejection-reason-list',
  templateUrl: './rejection-reason-list.component.html',
  styleUrls: ['./rejection-reason-list.component.scss']
})
export class RejectionReasonListComponent implements OnInit {


  rows: any = [];
  public subscription: Subscription[] = [];
  limit: number = 20;
  activePage: number = 1;
  total: number = 0;
  offset: number = 0;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    // private _alert: AlertsService,
    private ngPopups: NgPopupsService,
    private requestService: RequestService,
  ) {
    let params = {
      "pagination": 1,
      "page": this.activePage,
      "per_page": this.limit
    };
    this.getData(params);
  }

  ngOnInit() {
    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  getData(params) {
    this.subscription.push(
      this.requestService.sendRequest(RejectionReasonUrls.ALL_GET, 'get', params).subscribe(res => {
        if (res.status) {
          this.rows = res.result.data;
          this.total = res.result.total;
       
        } else {
          this.toastrService.error(res.message, "Error");
        }
      }, error => {
        this.toastrService.error(error['error'] ? error['error']['message'] : error.message, "Error");
      }));
  }

  onAdd() {
    this.router.navigate(["rejectionReason-add"], { relativeTo: this.route.parent });
  }

  onEdit(data: any) {
    this.router.navigate(["rejectionReason-edit/" + data["id"]], {
      relativeTo: this.route.parent
    });
  }

  onDelete(row: any): void {
    this.ngPopups.confirm('Do you  really want to delete this category?')
      .subscribe(res => {
        if (res) {
          console.log('You clicked OK. You dumb.');
          let delete_params_ids = [row['id']];
          // let delete_params_ids = [row['id']].toString();
          this.subscription.push(
            this.requestService.sendRequest(RejectionReasonUrls.DELETE_POST, 'delete_with_body', { ids: delete_params_ids }).subscribe(res => {
              console.log(res);
              if (res && res.status) {
                this.toastrService.success(res.message, "Success");
                let params = {
                  "pagination": 1,
                  "page": this.activePage,
                  "per_page": this.limit
                };
                this.getData(params);
              } else {
                this.toastrService.error(res.message, "Error");
              }
            }, error => {
              this.toastrService.error(error['error'] ? error['error']['message'] : error.message, "Error");
              console.error(
                "Please try again! Something went wrong",
                "Error", error['error'] ? error['error']['message'] : error.message
              );
            }));
        } else {
          console.log('You clicked Cancel. You smart.');
        }
      });

  }

  onPageChange(event) {
    console.log(event);
    this.limit = event.limit;
    this.offset = event.offset;
    this.activePage = event.offset + 1;
    let params = {};
    params['pagination'] = 1;
    params['page'] = this.activePage;
    params['per_page'] = this.limit;
    this.getData(params);
  }

  //========================================================================================
	/*                                                                                      *
	 *                    Called once, before the instance is destroyed.                    *
	 *                       Add 'implements OnDestroy' to the class.                       *
	 *                                                                                      */
  //========================================================================================

  ngOnDestroy(): void {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
