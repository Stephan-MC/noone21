import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'src/app/shared/services/request.service';
import { Subscription } from 'rxjs';
import { SkillUrls } from '../skill-urls.enum';

@Component({
  selector: 'app-skill-add',
  templateUrl: './skill-add.component.html',
  styleUrls: ['./skill-add.component.scss']
})
export class SkillAddComponent implements OnInit {

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
      this.requestService.sendRequest(SkillUrls.SAVE_POST, 'post', $event).subscribe(res => {
        if (res.status) {
          this.toastrService.success(res.message, "Success");
          this.router.navigate(['sub-category-list']);
        } else {
          this.toastrService.error(res.message, "Error");
        }
      }, error => {
        this.toastrService.error(error['error'] ? error['error']['message'] : error.message, "Error");
      }));
    // this.router.navigate(['list'], { relativeTo: this.route.parent });
  }

  redirect() {
    this.router.navigate(['sub-category-list'], { relativeTo: this.route.parent });
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
