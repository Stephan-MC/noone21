import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'src/app/shared/services/request.service';
import { Subscription } from 'rxjs';
import { ConsultationUrls } from '../consultation-urls.enum';

@Component({
  selector: 'app-consultation-add',
  templateUrl: './consultation-add.component.html',
  styleUrls: ['./consultation-add.component.scss']
})
export class ConsultationAddComponent implements OnInit {

  public subscription: Subscription[] = [];
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private requestService: RequestService,
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }


  formSubmitted($event) {
    this.subscription.push(
      this.requestService.sendRequest(ConsultationUrls.SAVE_POST, 'post', $event).subscribe(res => {
        if (res.status) {
          this.toastrService.success(res.message, "Success");
          this.redirect();
        } else {
          this.toastrService.error(res.message, "Error");
        }
      }, error => {
        this.toastrService.error(error['error'] ? error['error']['message'] : error.message, "Error");
      }));
    // this.router.navigate(['list'], { relativeTo: this.route.parent });
  }

  redirect() {
    this.router.navigate(['list'], { relativeTo: this.route.parent });
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
