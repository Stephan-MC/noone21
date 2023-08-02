import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'src/app/shared/services/request.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { LocalStorage } from 'src/app/libs/localstorage';
import { Subscription } from 'rxjs';
import { ReviewUrls } from 'src/app/reviews/review-urls.enum';
@Component({
  selector: 'app-vendor-reviews',
  templateUrl: './vendor-reviews.component.html',
  styleUrls: ['./vendor-reviews.component.scss']
})
export class VendorReviewsComponent implements OnInit {

  reviews = [];
  userId = [];
  subscription: Subscription[] = [];
  singleUserObject = null;
  constructor(
    private localStorage: LocalStorage,
    private loaderService: LoaderService,
    private requestService: RequestService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.singleUserObject = this.localStorage.getObject('user_details');
    this.userId = this.singleUserObject.id;
    this.getReviewsData();
  }

  getReviewsData() {
    let params = {
      "pagination": 0,
      user_id: this.userId,
      is_approved: 1
    };
    // this.showSpinner();
    this.subscription.push(
      this.requestService.sendRequest(ReviewUrls.ALL_GET, 'get', params).subscribe(res => {
        // this.hideSpinner();
        if (res.status) {
          this.reviews = res.result.data;
          this
        } else {
          this.toastr.error(res.message, "Error");
        }
      }, error => {
        // this.hideSpinner();
        this.toastr.error(error['error'] ? error['error']['message'] : error.message, "Error");
      }));
  }

}
