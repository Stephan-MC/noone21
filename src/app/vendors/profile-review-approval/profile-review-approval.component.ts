import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'src/app/shared/services/request.service';
import { UserUrls } from 'src/app/users/user-urls.enum';
import { mapping } from '../vendor-util';

@Component({
  selector: 'app-profile-review-approval',
  templateUrl: './profile-review-approval.component.html',
  styleUrls: ['./profile-review-approval.component.scss']
})
export class ProfileReviewApprovalComponent implements OnInit {
user_id=0;
singleUserObject = null;
  constructor( private route: ActivatedRoute, private requestService: RequestService, private toastr: ToastrService) {
   this.user_id= this.route.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.getUser(this.user_id);
  }
  publishedPro(id){
    this.requestService.sendRequest('admin/approval/published-profile','POST', {status:'published',id:id}).subscribe(res => {
      if (res && res.status) {
        this.toastr.success(res.message, 'Success');
      } else {
        this.toastr.error(res.message, 'Error');
      }
    }, error => {
      // this.disableButton = false;
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'success');

    });
  }
  publishedVideo(id){
    this.requestService.sendRequest('admin/approval/published-videos','POST', {status:'published',id:id}).subscribe(res => {
      if (res && res.status) {
        this.toastr.success(res.message, 'Success');
      } else {

        this.toastr.error(res.message, 'Error');

      }
    }, error => {
      // this.disableButton = false;
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'success');

    });
  }
  publishedImages(id){
    this.requestService.sendRequest('admin/approval/published-galary','POST', {status:'published',id:id}).subscribe(res => {
      if (res && res.status) {
        this.toastr.success(res.message, 'Success');
      } else {

        this.toastr.error(res.message, 'Error');

      }
    }, error => {
      // this.disableButton = false;
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'success');

    });
  }
  publishedMyworks(id){
    this.requestService.sendRequest('admin/approval/published-myworks','POST', {status:'published',id:id}).subscribe(res => {
      if (res && res.status) {
        this.toastr.success(res.message, 'Success');
      } else {

        this.toastr.error(res.message, 'Error');

      }
    }, error => {
      // this.disableButton = false;
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'success');

    });
  }
  getUser(id) {
    this.requestService.sendRequest('user/get-approval-user/single','GET', {status:'approval',id:id}).subscribe(res => {
      if (res && res.status) {
        this.singleUserObject = mapping(res.result.data);
      } else {

        this.toastr.error(res.message, 'Error');

      }
    }, error => {
      // this.disableButton = false;
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'success');

    });
  }



}
