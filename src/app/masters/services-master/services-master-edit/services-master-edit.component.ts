import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { RequestService } from 'src/app/shared/services/request.service';
import { ToastrService } from 'ngx-toastr';
import { ServicesUrls } from '../services-urls.enum';
@Component({
  selector: 'app-services-master-edit',
  templateUrl: './services-master-edit.component.html',
  styleUrls: ['./services-master-edit.component.scss']
})
export class ServicesMasterEditComponent implements OnInit {


  id = "";
  editData: any;
  public subscription: Subscription[] = [];
  constructor(public router: Router,
    private route: ActivatedRoute,
    private requestService: RequestService,
    private toastrService: ToastrService,) { }


  ngOnInit() {
    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.id = this.route.snapshot.params["id"];
    if (this.id) {
      this.subscription.push(
        this.requestService.sendRequest(ServicesUrls.SINGLE_GET + this.id, 'get', {}).subscribe(res => {
          if (res.status) {
            this.editData = res.result.data;
            console.log('this.editData', this.editData);
          } else {
            this.toastrService.error(res.message, "Error");
          }
        }, error => {
          this.toastrService.error(error['error'] ? error['error']['message'] : error.message, "Error");
        }));
    }
  }


  formSubmitted($event) {

    this.subscription.push(
      this.requestService.sendRequest(ServicesUrls.UPDATE_PUT, 'put', $event).subscribe(res => {
        if (res.status) {
          this.toastrService.success(res.message, "Success");
          this.redirect();
        } else {
          this.toastrService.error(res.message, "Error");
        }
      }, error => {
        this.toastrService.error(error['error'] ? error['error']['message'] : error.message, "Error");
      }));
    // this.router.navigate(["list"], { relativeTo: this.route.parent });
  }


  redirect() {
    this.router.navigate(['service-list'], { relativeTo: this.route.parent });
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
