import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestService } from 'src/app/shared/services/request.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LooseObject, isEmptyObjectKeys, mergeRecursive, removeEmptyKeysFromObject } from 'src/app/shared/utils/common-functions';
import { id } from '@swimlane/ngx-datatable';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { SharedUrls } from 'src/app/shared/utils/shared-urls.enum';
import { isObject } from 'lodash';
import { Observable, ObservableInput, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, map, catchError } from 'rxjs/operators';
import { RejectionReasonUrls } from 'src/app/masters/rejection-reason/rejection-reason-urls.enum';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ReviewUrls } from 'src/app/reviews/review-urls.enum';
import { LocalStorage } from 'src/app/libs/localstorage';

@Component({
  selector: 'app-classified-listview',
  templateUrl: './classified-listview.component.html',
  styleUrls: ['./classified-listview.component.scss']
})
export class ClassifiedListviewComponent implements OnInit {
  @ViewChild('RejectionModal', { static: false }) rejectionModal: ModalDirective;
  @ViewChild('verificationsModal', { static: false }) verificationsModal: ModalDirective;
  @ViewChild('reviewsModal', { static: false }) reviewsModal: ModalDirective;
  @ViewChild('resetPModal', { static: false }) resetPModal: ModalDirective;
  roles = [];
  rows:any;
  total = 0;
  page = 1;
  offset = 0;
  limit = 20;
  userId='';
  userToken='';
  catgories='';
  smallNumPages = 0;
  sortType = 1;
  form: UntypedFormGroup;
  fg: UntypedFormGroup;
  filterForm: UntypedFormGroup;
  selectedUser: any;
  isEmptyObjectKeys = isEmptyObjectKeys;
  searching = false;
  searchFailed = false;
  statuses = [{ id: 1, name: 'created' }, { id: 2, name: 'Waiting For Approval' }, { id: 3, name: "Rejected" }, { id: 4, name: 'Approved' }];
  approvals = [];
  reviews = [];
  constructor(
    private requestService: RequestService,
    private toastrService: ToastrService,
    private router: Router,
    private localStorage: LocalStorage,
    private formBuilder: UntypedFormBuilder,
    private loaderService: LoaderService
  ) {
    this.userId = this.localStorage.getObject('user_details').token;
    this.userToken=this.localStorage.getObject('user_details').active_jwt_token;
    this.fg = this.formBuilder.group({
      password: [null, Validators.required],
      repeat: [null, Validators.required]
    });

    this.form = this.formBuilder.group({
      'rejection_reason_id': ['', Validators.required],
      'comments': [''],
      'status_id': [''],
      'user_id': [''],
    })
    this.filterForm = this.formBuilder.group({
      'status_id': [null],
      'search': [''],
      'categoryId': [null],
    })
  }


  ngOnInit(): void {
    this.getClassified();
  }

  onFilter() {
    this.offset = 0;
    this.page = 1;
    this.getClassified();
  }

  onReset() {
    this.offset = 0;
    this.page = 1;
    this.filterForm.reset();
    this.getClassified();
  }
  Delete(id){
    this.requestService.sendRequest('classified/post/delete', 'post',{'id':id,'active_jwt_token':this.userToken}).subscribe(res => {
      this.loaderService.hide();
      if (res && res.status) {
        this.toastrService.success(res.message, null);
        this.getClassified();
      } else {
        this.toastrService.error(res.message, 'Error');

      }
    }, error => {
      this.loaderService.hide();
      this.toastrService.error(error.error ? error.error.message : error.message, 'success');
    })
  }

  makeParams() {
    let param: LooseObject = {};
    param['active_jwt_token'] = this.userToken;
    param['page'] = this.page;
    param['pagination'] = 1;
    param['per_page'] = this.limit;
    param = removeEmptyKeysFromObject(mergeRecursive(param, this.filterForm.value));
    return param;
  }

  doSort() {
    this.page = 1;
    this.getClassified();
  }
edit(id){
 // this.router.navigate(['classified/edit/'+this.userToken+'/'+id]);
return this.router.navigate(['dashboard/vendor/classified/edit/'+this.userToken+'/'+id]);
  
}
getCategory(){
  this.requestService.sendRequest('classified/category/get', 'GET',{}).subscribe(res => {
    if (res && res.status) {
      this.catgories = res.result.data;
    } else {

    }
  }, error => {

    this.toastrService.error(error.error ? error.error.message : error.message, 'success');
  })
}
  getClassified() {
    let params = this.makeParams();
    this.requestService.sendRequest('classified/post/get', 'GET', params).subscribe(res => {
      if (res && res.status) {
      
        this.total = res.result.total;
        this.rows = res.result.data;
        this.getCategory();
      } else {

      }
    }, error => {

      this.toastrService.error(error.error ? error.error.message : error.message, 'success');
    })
  }

  onPageChange(event) {
    console.log("DoctorListComponent -> pageChanged -> event", event);
    this.offset = event.offset;
    this.page = event.offset + 1;
    this.getClassified()

  }

  viewProfile(user) {
    if (user.role.id == 4) {
      this.router.navigate(['doctors/view/' + user.id])
    }
    if (user.role.id == 3) {
      this.router.navigate(['patient/view/' + user.id])
    }
  }

  showRejectionModal(row): void {
    this.selectedUser = row;
    this.rejectionModal.show();
  }

  hideRejectionModal(): void {
    this.rejectionModal.hide();
  }

}
