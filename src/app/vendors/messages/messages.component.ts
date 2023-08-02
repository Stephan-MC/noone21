import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/shared/services/request.service';
import { LooseObject } from 'src/app/shared/utils/common-functions';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorage } from 'src/app/libs/localstorage';
import { SharedUrls } from 'src/app/shared/utils/shared-urls.enum';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  approvals = [];
  userId = [];
  singleUserObject = null;
  comments = '';
  constructor(
    private localStorage: LocalStorage,
    private loaderService: LoaderService,
    private requestService: RequestService,
    private toastr: ToastrService,
  ) {
    this.singleUserObject = this.localStorage.getObject('user_details');
    this.userId = this.singleUserObject.id;
  }

  ngOnInit(): void {
    this.getApprovals();
  }

  onEnter(event) {
    if (event.keyCode === 13) {
      this.addVerification();
    }
  }

  addVerification() {
    let formData: LooseObject = {};
    formData['user_id'] = this.userId;
    formData['status_id'] = 2;
    formData['comments'] = this.comments;
    if (!this.comments) {
      this.toastr.error('Please add comment');
      return false;
    }
    this.loaderService.show();
    this.requestService.sendRequest(SharedUrls.ADD_POST, 'POST', formData).subscribe(res => {
      this.loaderService.hide();
      if (res && res.status) {
        this.approvals.push(res.result.data);
        this.toastr.success(res.message, 'Success');
        // this.getApprovals();
        this.comments = '';
      } else {
        this.toastr.error(res.message, 'Error');

      }
    }, error => {
      this.loaderService.hide();
      this.toastr.error(error.error ? error.error.message : error.message, 'success');
    })
  }


  getApprovals() {
    let formData = { user_id: this.userId };
    this.requestService.sendRequest(SharedUrls.ALL_GET, 'GET', formData).subscribe(res => {
      if (res && res.status) {
        this.approvals = res.result.data.reverse();
      } else {
        this.toastr.error(res.message, 'Success');

      }
    }, error => {
      this.toastr.error(error.error ? error.error.message : error.message, 'Error');
    });
  }

}
