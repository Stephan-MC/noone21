import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/shared/services/request.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { UserUrls } from 'src/app/users/user-urls.enum';
import * as moment from 'moment';
import { LooseObject, isEmptyObject, makeSingleNameFormFIrstMiddleAndLastNames, parseFloatC } from 'src/app/shared/utils/common-functions';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ReviewUrls } from 'src/app/reviews/review-urls.enum';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent implements OnInit {
  id: string;
  moment = moment;
  currentDoctor = null;
  currentRate = 0;
  loggedInUser: LooseObject = {};
  isEmptyObject = isEmptyObject;
  form: UntypedFormGroup;
  parseFloatC = parseFloatC;
  disableButton: boolean = false;

  reviews = [];
  subscription: Subscription[] = [];
  constructor(
    private requestService: RequestService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private spinner: NgxSpinnerService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.loggedInUser = this.isEmptyObject(this.requestService.getLoggedInUser()) ? null : this.requestService.getLoggedInUser();
    this.form = this.formBuilder.group({
      "email": [''],
      "user_name": [''],
      "comment": [''],
      "id": [this.loggedInUser ? this.loggedInUser.id : '', [Validators.required]]
    })

  }

  ngOnInit(): void {
    this.getUser(this.id);
    this.getReviewsData();
    $.getScript("assets/js/select2.js");
    if (this.requestService.getLoggedUserRole() == 1 && this.ifInRoute('doctors/view/')) {
      $('body').addClass("admin-user");
    }
  }

  ifInRoute(str) {
    if (<any>this.router.url.includes(str)) {
      return true
    }
    return false;
  }

  getYear(dateString) {

    if (!dateString) {
      return ''
    }
    var date = <any>new Date(dateString);
    if (!isNaN(date)) {
      return date.getFullYear();
    }
  }

  getUser(id) {
    this.subscription.push(
      this.requestService.sendRequest(UserUrls.SINGLE_GET + id, 'GET', { is_doctor: 1 }).subscribe(res => {
        console.log("DoctorProfileComponent -> getUser -> res", res)

        if (res && res.status) {
          this.currentDoctor = res.result.data;
          if (this.currentDoctor.avg_rating) {
            this.currentDoctor.avg_rating = parseFloat(this.currentDoctor.avg_rating).toFixed(2);
            console.log("DoctorProfileComponent -> getUser -> this.currentDoctor.average_rating", this.currentDoctor.avg_rating)
          }
          // if (this.currentDoctor['categories'] && Array.isArray(this.currentDoctor['categories'])) {
          //   this.currentDoctor['categories_name'] = this.currentDoctor['categories'].map(c => c.category_name).join(', ');
          // }

        } else {

          this.toastrService.error(res.message, 'Error');

        }
      }, error => {
        this.toastrService.error(error.error ? error.error.message : error.message, 'success');

      })
    );
  }

  getCategoriesName(category) {
    if (category && Array.isArray(category)) {
      return category.map(c => c.category_name).join(', ');
    }

    return '';
  }

  getEducationsName(education) {
    if (education && Array.isArray(education) && education.length > 0) {
      // ES5 equivalent
      let result = education[0].education_type_id == 1 ? education[0].title + ' (' + education[0].institute + ')' : '';
      for (let i = 1; i < education.length; i++) {
        if (education[i].education_type_id == 1) {
          if (i < education.length - 1) {
            result += ', ' + education[i].title + ' (' + education[i].institute + ')';
          } else {
            result += ' , ' + education[i].title + ' (' + education[i].institute + ')';
          }
        }
      }

      return result;
    }
    return '';
  }
  addReview() {
    let formData = null;
    console.log(this.form.value, 'values');
    if (this.id && this.loggedInUser && this.form.valid) {
      formData = {
        "user_id": this.id,
        // "review": this.currentDoctor.id,
        "review_by_id": this.loggedInUser.id,
        "comments": this.form.getRawValue().comment,
        "review": this.currentRate
      }
    }
    // else {
    //   this.toastrService.error('Something Went Wrong !', 'Error');
    //   return false;
    // }
    if (!this.currentRate) {
      this.toastrService.error('please Select Rating !', 'Error');
      return false;
    }
    if (!this.form.value.comment) {
      this.toastrService.error('please add review description !', 'Error');
      return false;
    }
    this.disableButton = true;
    this.requestService.sendRequest(ReviewUrls.ADD_POST, 'Post', formData).subscribe(res => {
      this.disableButton = false
      if (res && res.status) {
        this.toastrService.success(res.message, 'Success');
        this.currentRate = 0;
        this.form.get('comment').setValue('');
        this.getUser(this.id);
        this.getReviewsData();
      } else {

        this.toastrService.error(res.message, 'Error');

      }
    }, error => {
      this.disableButton = false
      this.toastrService.error(error.error ? error.error.message : error.message, 'success');

    });
  }

  getReviewsData() {
    let params = {
      "pagination": 0,
      user_id: this.id,
      is_approved: 1
    };
    this.showSpinner();
    this.subscription.push(
      this.requestService.sendRequest(ReviewUrls.ALL_GET, 'get', params).subscribe(res => {
        this.hideSpinner();
        if (res.status) {
          this.reviews = res.result.data;
          this
        } else {
          this.toastrService.error(res.message, "Error");
        }
      }, error => {
        this.hideSpinner();
        this.toastrService.error(error['error'] ? error['error']['message'] : error.message, "Error");
      }));
  }
  showSpinner() {
    this.spinner.show();
    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 5000);
  }

  hideSpinner() {
    this.spinner.hide();
  }
  viewProfile(doc) {
    this.router.navigate(['pages/doctor/' + doc.id])
  }

  isArray(obj) {
    return !!obj && obj.constructor === Array;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    $('body').removeClass("admin-user");
  }
}
