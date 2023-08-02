import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'src/app/shared/services/request.service';
import { Subscription } from 'rxjs';
import { CategoryUrl } from '../category-url.enum';
import { CategoryFormComponent } from '../category-form/category-form.component';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {
  public subscription: Subscription[] = [];
  @ViewChild(CategoryFormComponent) categoryComp: CategoryFormComponent;
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
    this.categoryComp.disableButton = true;
    this.subscription.push(
      this.requestService.sendRequest(CategoryUrl.SAVE_POST, 'post', $event).subscribe(res => {
        this.categoryComp.disableButton = false;
        if (res.status) {
          this.toastrService.success(res.message, "Success");
          this.redirect();
        } else {
          this.toastrService.error(res.message, "Error");
        }
      }, error => {
        this.categoryComp.disableButton = false;
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
